mod data;
mod email_sender;
mod detect;
mod api;
mod recipe;

use actix_web::{App, get, HttpServer, Responder, web};
use firestore_db_and_auth::{Credentials, ServiceSession, documents};
use futures_util::StreamExt;
use serde::{Deserialize, Serialize};
use serde::de::Unexpected::Str;
use tokio::io;
use crate::data::{ProductCategories, User, UserGroceries};
use crate::detect::{detect_image, get_objects_from_response};
use crate::email_sender::send_email;

#[get("/")]
async fn hello_world() -> impl Responder {
    "Hello World!"
}

#[actix_web::main]
async fn main() -> io::Result<()> {
    let cred = Credentials::from_file("cred.json").await
        .expect("Read credentials file")
        .download_jwkset().await
        .expect("Failed to download public keys");
    let session = ServiceSession::new(cred).await
        .expect("Create a service account session");
    println!("Connected to Firestore");
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(session.clone()))
            .service(api::detect)
            .service(api::email)
            .service(hello_world)
    })
        .bind(("0.0.0.0", 3941))?
        .run()
        .await
}
