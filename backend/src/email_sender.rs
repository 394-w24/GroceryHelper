use std::error::Error;
use std::sync::mpsc::Receiver;
use lettre::{AsyncSmtpTransport, AsyncTransport, Message, Tokio1Executor};
use lettre::message::{MultiPart, SinglePart};
use lettre::transport::smtp::authentication::Credentials;
use lettre::transport::smtp::response::Response;
use crate::recipe;


async fn create_html_body(body: &String, image_url: &String, food_list: &Vec<(String, i32, String)>) -> String {
    let mut html = String::new();

    html.push_str("<html><head><style>");
    html.push_str("
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        ul { list-style-type: none; padding: 0; }
        li { margin-bottom: 10px; }
        img { max-width: 100%; height: auto; display: block; margin: 20px 0; }
        .food-item { color: #333; }
        .recipe-link { color: #0066CC; text-decoration: none; }
        h2 { color: #444; }
    ");
    html.push_str("</style></head><body>");

    html.push_str(&format!("<p>{}</p><ul>", body));
    for food in food_list {
        html.push_str(&format!("<li class=\"food-item\">{}: {} in {}</li>", food.0, food.1, food.2));
    }
    html.push_str("</ul>");

    let recipes = recipe::get_recipes(&food_list.iter().map(|x| x.0.clone()).collect()).await;
    if recipes.is_ok() {
        let recipes = recipes.unwrap();
        html.push_str("<h2>Here Are The Recipes You May Need</h2><ul>");
        for recipe in recipes {
            html.push_str(&format!("<li><a class=\"recipe-link\" href=\"{}\">{}</a></li>", recipe.1, recipe.0));
        }
        html.push_str("</ul>");
    }

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