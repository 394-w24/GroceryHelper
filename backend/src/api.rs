use std::collections::HashMap;
use actix_web::{post, web, get, HttpResponse, Responder};
use firestore_db_and_auth::{documents, dto, ServiceSession};
use futures_util::StreamExt;
use serde::{Deserialize, Serialize};
use crate::data::{Product, User, UserGroceries, Settings};
use crate::detect::{detect_image, get_objects_from_response};
use chrono::{DateTime, Utc, ParseResult};
use crate::email_sender::send_email;

fn parse_iso8601(date_str: &String) -> ParseResult<DateTime<Utc>> {
    date_str.parse::<DateTime<Utc>>()
}
pub async fn get_user_email(db: &ServiceSession, user_id: &String) -> Option<String> {
    let values = documents::query(db, "users", user_id.clone().into(), dto::FieldOperator::EQUAL, "uid").await;
    if let Err(e) = &values {
        println!("Error fetching document: {:?}", e);
        return None;
    }
    for metadata in values.unwrap() {
        let user: User = documents::read_by_name(db, &metadata.name).await.unwrap();
        // if user.settings.is_none() {
        //     return None;
        // }
        return Some(user.email);
    }
    None
}

pub async fn get_all_users(db: &ServiceSession, data: &mut HashMap<String, User>, uid: &String) -> Option<User> {
    if data.contains_key(uid) {
        return data.get(uid).cloned();
    }
    let values = documents::query(db, "users", uid.clone().into(), dto::FieldOperator::EQUAL, "uid").await;
    if let Err(e) = &values {
        println!("Error fetching document: {:?}", e);
        return None;
    }
    for metadata in values.unwrap() {
        let user: User = documents::read_by_name(db, &metadata.name).await.unwrap();
        data.insert(uid.clone(), user.clone());
        // if user.settings.is_none() {
        //     return None;
        // }
        return Some(user);
    }
    None
}

pub async fn check_user_id(db: &ServiceSession, id: &String) -> bool {
    let values = documents::query(db, "users", id.clone().into(), dto::FieldOperator::EQUAL, "uid").await;
    if let Err(e) = &values {
        println!("Error fetching document: {:?}", e);
        return false;
    }
    for value in values.unwrap() {
        // println!("Value: {:?}", value);
        return true;
    }
    // values.unwrap().any(|x| true)
    false
}

pub async fn get_products_map(db: &ServiceSession) -> HashMap<String, String> {
    // including json file from product.json
    let content = include_str!("../product.json");
    return serde_json::from_str(content).unwrap();
}
#[derive(Debug, Serialize, Deserialize)]
pub struct DetectResp {
    pub error: Option<String>,
    pub data: Option<Vec<String>>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct DetectReq {
    pub user_id: String,
    pub image_url: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct EmailReq {
    pub user_id: String,
}
#[post("/detect")]
pub async fn detect(db: web::Data<ServiceSession>, data: web::Query<DetectReq>) -> impl Responder {
    let info = data.into_inner();
    let user_id = info.user_id.clone();
    let image_url = info.image_url.clone();
    println!("User id: {}, Image URL: {}", user_id, image_url);
    if !check_user_id(&db, &user_id).await {
        return web::Json(
            DetectResp {
                error: Some("User not found".to_string()),
                data: None,
            }
        );
    }
    let result = detect_image(&image_url).await;
    match result {
        Ok(map) => {
            let objects = get_objects_from_response(&map);
            web::Json(
                DetectResp {
                    error: None,
                    data: Some(objects),
                }
            )
        }
        Err(e) => {
            web::Json(
                DetectResp {
                    error: Some(format!("Error: {:?}", e)),
                    data: None,
                }
            )
        }
    }
}


#[get("/email")]
pub async fn email(db: web::Data<ServiceSession>, data: web::Query<EmailReq>) -> impl Responder {
    let info = data.into_inner();
    let user_id = info.user_id.clone();
    println!("Email User id: {}", user_id);
    if !check_user_id(&db, &user_id).await {
        return HttpResponse::Ok().body("User not found");
    }
    let mut expired_groceries = HashMap::new();
    let mut stream = documents::list(db.get_ref(), "userGroceries");
    let products_map = get_products_map(db.get_ref()).await;
    let mut users_map = HashMap::new();
    while let Some(item_result) = stream.next().await {
        if let Err(e) = &item_result {
            println!("Error fetching userGroceries: {:?}", e);
            continue;
        }
        // println!("Item: {:?}", &item_result);
        let (item, _metadata) = item_result.unwrap();
        let item: UserGroceries = item;
        let current_user = get_all_users(db.get_ref(), &mut users_map, &item.user_id).await;
        if current_user.is_none() {
            println!("User not found: {}", &item.user_id);
            continue;
        }
        let user_settings = current_user.unwrap().settings.clone();
        if user_settings.is_none() {
            continue;
        }
        let user_settings = user_settings.unwrap();
        if !user_settings.send_email {
            continue;
        } 
        let send_time = chrono::NaiveTime::parse_from_str(&user_settings.send_time, "%H:%M");
        if send_time.is_err() {
            continue;
        }
        let send_time = send_time.unwrap();
        let now = chrono::Local::now().time();
        // if now < send_time || now - send_time > chrono::Duration::minutes(5) {
        //     continue;
        // }
        // println!("Item2");

        let expired = match parse_iso8601(&item.expired_at) {
            Ok(date_time) => {
                // println!("Date time: {:?}", &date_time);
                // println!("Now: {:?}", date_time - Utc::now());
                // println!("user id {:?}", &item.user_id);
                date_time - Utc::now() < chrono::Duration::hours(user_settings.send_before as i64)
            },
            Err(e) => false,
        };
        if expired {
            let mut list = expired_groceries.entry(item.user_id.clone()).or_insert(vec![]);
            // println!("Expired: {:?}", &item.product_id);
            let product_name = products_map.get(&item.product_id);
            if product_name.is_none() {
                continue;
            }
            let product_name = product_name.unwrap().clone();
            // let product_name = item.product_id.clone();
            let storage_type = item.storage_type.clone();
            let quantity = item.quantity;
            list.push((product_name, quantity, storage_type));
        }
    }
    let mut emails_sent = 0;
    for (user_id, list) in expired_groceries {
        if let Some(email) = get_user_email(db.get_ref(), &user_id).await {
            let current_user = get_all_users(db.get_ref(), &mut users_map, &user_id).await;
            if current_user.is_none() {
                println!("User not found: {}", &user_id);
                continue;
            }
            let user_settings = current_user.unwrap().settings.clone();
            let body = format!("Oh crap! Your these things in your kitchen are going bad in {} hours!", user_settings.unwrap().send_before);
            let image_url = "".to_string();
            println!("Sending email to {}", &email);
            println!("list: {:?}", &list);
            let result = send_email(&email, &body, &image_url, &list).await;
            match result {
                Ok(_) => {
                    emails_sent += 1;
                    println!("Email sent to {}", email);
                }
                Err(e) => {
                    println!("Error sending email to {}: {:?}", email, e);
                }
            }
        }
    }
    HttpResponse::Ok().body(format!("Emails sent: {}", emails_sent))
}