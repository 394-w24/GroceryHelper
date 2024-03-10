use serde::{Deserialize, Serialize};
use std::collections::HashMap;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Settings {
    #[serde(rename = "sendBefore")]
    pub send_before: i32,

    #[serde(rename = "sendEmail")]
    pub send_email: bool,

    #[serde(rename = "sendTime")]
    pub send_time: String,
}

impl Settings {
    pub fn new(data: &HashMap<String, String>) -> Settings {
        Settings {
            send_before: data.get("sendBefore").unwrap().parse::<i32>().unwrap_or(24),
            send_email: data.get("sendEmail").unwrap().parse::<bool>().unwrap_or(false),
            send_time: data.get("sendTime").unwrap().parse::<String>().unwrap_or("08:00".to_string()),
        }
    }
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct User {
    pub uid: String,

    #[serde(rename = "displayName")]
    pub display_name: String,

    pub email: String,

    #[serde(rename = "photoURL")]
    pub photo_url: String,

    pub settings: Option<Settings>,
}


#[derive(Debug, Serialize, Deserialize)]
pub struct UserGroceries {
    #[serde(rename = "userId")]
    pub user_id: String,

    #[serde(rename = "imageURL")]
    pub image_url: String,

    pub quantity: i32,

    #[serde(rename = "productId")]
    pub product_id: String,

    #[serde(rename = "storageType")]
    pub storage_type: String,

    #[serde(rename = "createdAt")]
    pub created_at: String,

    #[serde(rename = "expiredAt")]
    pub expired_at: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ProductCategories {

    #[serde(rename = "categoryName")]
    pub category_name: String,

    #[serde(rename = "subCategoryName")]
    pub sub_category_name: Option<String>
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Product {
    #[serde(rename = "categoryId")]
    pub category_id: i32,

    pub name: String,

    pub description: Option<String>,

    pub pantry: i32,

    pub refrigerate: i32,

    pub freeze: i32,
}
