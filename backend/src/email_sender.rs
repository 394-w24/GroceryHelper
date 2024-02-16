use std::error::Error;
use std::sync::mpsc::Receiver;
use lettre::{AsyncSmtpTransport, AsyncTransport, Message, Tokio1Executor};
use lettre::message::{MultiPart, SinglePart};
use lettre::transport::smtp::authentication::Credentials;
use lettre::transport::smtp::response::Response;



fn create_html_body(body: &String, image_url: &String, food_list: &Vec<String>) -> String {
    let mut html = format!("<p>{}</p><ul>", body);
    for food in food_list {
        html.push_str(&format!("<li>{}</li>", food));
    }
    html.push_str("</ul>");
    if image_url.len() > 0 {
        html.push_str(&format!("<img src=\"{}\" alt=\"Food Image\">", image_url));
    }
    html
}
pub async fn send_email(receiver: &String, body: &String, image_url: &String, food_list: &Vec<String>)
                        -> Result<Response, Box<dyn Error + Send + Sync>>
{

    println!("Creating email");
    let email = Message::builder()
        .from("GroceryHelper <xukunliu2025@u.northwestern.edu>".parse()?)
        .to(receiver.parse()?)
        .subject("GroceryHelper")
        .multipart(
            MultiPart::alternative().singlepart(
                SinglePart::html(create_html_body(&body, &image_url, &food_list))
            ),
        )?;
    println!("Email created");
    let creds = Credentials::new("xukunliu2025@u.northwestern.edu".to_owned(), "qnlrztpvtguuhfcj".to_owned());
    let mailer: AsyncSmtpTransport<Tokio1Executor> =
        AsyncSmtpTransport::<Tokio1Executor>::relay("smtp.gmail.com")
            .unwrap()
            .credentials(creds)
            .build();
    println!("Mailer created");
    Ok(mailer.send(email).await?)
}