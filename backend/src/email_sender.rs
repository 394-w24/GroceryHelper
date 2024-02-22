use std::error::Error;
use std::sync::mpsc::Receiver;
use lettre::{AsyncSmtpTransport, AsyncTransport, Message, Tokio1Executor};
use lettre::message::{MultiPart, SinglePart};
use lettre::transport::smtp::authentication::Credentials;
use lettre::transport::smtp::response::Response;
use crate::recipe;


async fn create_html_body(body: &String, image_url: &String, food_list: &Vec<(String, i32, String)>) -> String {
    let mut html = String::new();

    // Add styles for the header, table with border, table header, and footer
    html.push_str("<html><head><style>");
    html.push_str("
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; }
        h1 { text-align: center; font-size: 24px; margin-top: 20px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .recipe-list { margin-top: 20px; }
        .recipe-item a { color: #0066CC; text-decoration: none; }
        .footer { text-align: center; font-size: 0.8em; margin-top: 30px; color: #777; }
    ");
    html.push_str("</style></head><body>");

    // Add header
    html.push_str(&format!("<h1>{}</h1>", body));

    // Create table for food items with headers
    html.push_str("<table><tr><th>Item</th><th>Qty</th><th>Location</th></tr>");
    for food in food_list {
        html.push_str(&format!("<tr><td>{}</td><td>{}</td><td>{}</td></tr>", food.0, food.1, food.2));
    }
    html.push_str("</table>");

    // Fetch and list the recipes with links
    let recipes = recipe::get_recipes(&food_list.iter().map(|x| x.0.clone()).collect()).await;
    if recipes.is_ok() {
        let recipes = recipes.unwrap();
        html.push_str("<div class=\"recipe-list\"><h2>Well, you know what to do, Here are the recipes you may need:</h2><ul>");
        for recipe in recipes {
            html.push_str(&format!("<li class=\"recipe-item\"><a href=\"{}\">{}</a></li>", recipe.1, recipe.0));
        }
        html.push_str("</ul></div>");
    }

    // Add footer
    html.push_str("<div class=\"footer\">");
    html.push_str("You are receiving this email because you opted in via the app.<br/>");
    html.push_str("Corporation<br/>Evanston, IL</div>");

    if image_url.len() > 0 {
        html.push_str(&format!("<img src=\"{}\" alt=\"Food Image\">", image_url));
    }

    html.push_str("</body></html>");

    html
}

pub async fn send_email(receiver: &String, body: &String, image_url: &String, food_list: &Vec<(String, i32, String)>)
                        -> Result<Response, Box<dyn Error + Send + Sync>>
{

    println!("Creating email");
    let email = Message::builder()
        .from("GroceryHelper <xukunliu2025@u.northwestern.edu>".parse()?)
        .to(receiver.parse()?)
        .subject("GroceryHelper")
        .multipart(
            MultiPart::alternative().singlepart(
                SinglePart::html(create_html_body(&body, &image_url, &food_list).await)
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