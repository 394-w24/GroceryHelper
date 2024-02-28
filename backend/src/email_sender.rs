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
        html { height: 100%;}
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding-right: 80px; padding-left: 80px;
            background: linear-gradient(to bottom, #f9fff7 0%, #bde8a5 100%); background-attachment: fixed; text-align: center; }
        h1 {font-size: 1.8rem;margin-top: 20px;}
        h2 {font-size: 0.8rem;font-weight: normal;}
        h3 {font-size: 0.7rem;margin-top: 10px;font-weight: normal;}
        .recipe-list { margin-top: 20px; }
        .recipe-item a { color: #000000; text-decoration: none; }
        ul, li {list-style-type: none; padding-left: 0; margin-left: 0; }
        .footer { text-align: center; font-size: 0.8em; margin-top: 30px; color: #777; }
        button {
            padding: 15px 30px;
            font-size: 1.3rem;
            border: none;
            cursor: pointer;
            text-transform: uppercase;
            font-weight: bold;
            margin: 15px;
            display: inline-block; /* This will allow you to set a width and height if you want */
            transition: all 0.3s ease;
            width: 100%; /* Adjust width as needed or use 'auto' for content-based width */
            height: 70px;
            background: lightblue;
          }
        button:hover {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.24);
            transform: translateY(-2px);
          }
    ");
    html.push_str("</style></head><body>");
    // TODO: Need to add a image at top
    // Add header,
    // TODO: need to change the hour -- 48 hours
    // html.push_str(&format!("<h1>{}</h1>", body));
    html.push_str("<h1>Oh crap! The following items in your kitchen are going bad in 48 hours.</h1>");
    // List the produce items
    html.push_str("<div class=\"food-list\">");
    for (i, food) in food_list.iter().enumerate() {
        html.push_str(&format!("<p>{} {} in your {}</p>", food.1, food.0, food.2));
    }
    html.push_str("</div>");    
    html.push_str("<br />");
    // Fetch and list the recipes with links
    let recipes = recipe::get_recipes(&food_list.iter().map(|x| x.0.clone()).collect()).await;
    if recipes.is_ok() {
        let recipes = recipes.unwrap();
        html.push_str("<div class=\"recipe-list\"><h2>Good thing we know exactly what you should make with it.</h2><ul>");
        for recipe in recipes {
            html.push_str(&format!("<li class=\"recipe-item\"><button><a href=\"{}\">{}</a></button></li>", recipe.1, recipe.0));
        }
        html.push_str("</ul></div>");
    }

    // Add footer
    html.push_str("<div class=\"footer\">");
    html.push_str("You are receiving this email because you opted in via the app.<br/>");
    html.push_str("Tired of the fridge surprise with more science experiment than snack? 🍓🥦 Meet Stay Fresh - <br/>");
    html.push_str("your produce's new best friend. We're here to banish food waste one alert at a time, making sure<br/>");
    html.push_str("your fruits and veggies live their best (and tastiest) life before making the tragic journey to the trash.<br/>");
    html.push_str("Stay Fresh: Where every bite is at its prime, and nothing goes to waste. Let's keep it crisp together!<br/>");

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