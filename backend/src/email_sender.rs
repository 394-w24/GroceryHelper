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
       html {
      height: 100%;
    }
    .header-background {
        background-image: url('https://foodrevolution.org/wp-content/uploads/2019/01/iStock-855098134-marilyna-featured.jpg'); 
        background-size: cover;
        background-position: center;
        height: 200px; 
      }
    .appbody {
      font-family: 'Arial', sans-serif;
      /* Adjusted to a more commonly available font */
      line-height: 1.6;
      margin: 0;
      padding: 0 80px;
      /* Combined padding-right and padding-left */
      background: linear-gradient(to bottom, #ffecd2 0%, #fcb69f 100%);
      /* Updated gradient colors */
      background-attachment: fixed;
      text-align: center;
    }

    h1 {
      font-size: 2.5rem;
      /* Increased font size */
      color: #333;
      /* Darker text color */
      margin-top: 40px;
      /* Increased top margin */
    }

    h2 {
      font-size: 1rem;
      /* Increased font size */
      font-weight: normal;
      color: #333;
      /* Darker text color */
      text-align: center;
      /* Align text to the left */
    }

    h3 {
      font-size: 0.9rem;
      /* Increased font size */
      margin-top: 10px;
      font-weight: normal;
      color: #333;
      /* Darker text color */
      text-align: left;
      /* Align text to the left */
    }

    .food-list {
      text-align: left;
      /* Align text to the left */
      padding: 0;
      /* Adjust padding */
    }

    .recipe-suggestion a {
      color: white;
      /* Light text color for better contrast */
      text-decoration: none;
      display: block;
      /* Make the link fill the button */
    }

    .footer {
      font-size: 0.8em;
      margin-top: 30px;
      color: #777;
    }

    .footer a {
      color: #0066cc;
      text-decoration: none;
    }

    button {
      padding: 15px 30px;
      font-size: 1.1rem;
      /* Adjusted font size */
      border: none;
      cursor: pointer;
      text-transform: uppercase;
      font-weight: bold;
      margin: 15px;
      display: inline-block;
      width: 100%;
      /* Adjusted width */
      height: 50px;
      /* Adjusted height */
      background: #ff8a65;
      /* Adjusted button color */
      border-radius: 25px;
      /* Rounded corners */
      box-shadow: 0 4px #c75b39;
      /* Added box-shadow for 3D effect */
      text-align: center;
      
    }

    button:hover {
      background: #ff7043;
      /* Darker background on hover */
    }

    ul,
    li {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    /* Additional styling for list items */
    .food-list ul {
      padding: 0;
    }

    .food-list li {
      background: #ffffff;
      /* White background for list items */
      margin-bottom: 10px;
      /* Space between list items */
      padding: 10px;
      border-radius: 5px;
      /* Rounded corners for list items */
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
      /* Shadow for list items */
    }
    ");
    html.push_str("</style></head><body><div class=\"appbody\">");
    html.push_str("<div class=\"header-background\"></div>");
    // Add header
    html.push_str(&format!("<h1>{}</h1>", body));

    // Create table for food items with headers
    html.push_str("<div class=\"food-list\"><ul>");
    for food in food_list {
        html.push_str(&format!("<li><h2>{} {} in your {}</h2></li>", food.1, food.0, food.2));
    }
    html.push_str("</ul></div>");
    html.push_str("<div class=\"recipe-suggestion\">
    <h3>Good thing we know exactly what you should make with it.</h3>
    <ul>");

    // Fetch and list the recipes with links
    let recipes = recipe::get_recipes(&food_list.iter().map(|x| x.0.clone()).collect()).await;
    if recipes.is_ok() {
        let recipes = recipes.unwrap();
        for recipe in recipes {
            html.push_str(&format!("<li><button><a href=\"{}\">{}</a></button></li>", recipe.1, recipe.0));
        }
        html.push_str("</ul></div>");
    }

    // Add footer
    html.push_str("<div class=\"footer\">");
    html.push_str("<p>You are receiving this email because you opted in via our app.</p>
    <p>Tired of the fridge surprise with more science experiment than snack? 🍓🥦 Meet Stay Fresh.</p>
    <p><a href=\"#\">Unsubscribe</a></p>");
    html.push_str("</div>");

    if image_url.len() > 0 {
        html.push_str(&format!("<img src=\"{}\" alt=\"Food Image\">", image_url));
    }

    html.push_str("</div></body></html>");

    html
}

pub async fn send_email(receiver: &String, body: &String, image_url: &String, food_list: &Vec<(String, i32, String)>)
                        -> Result<Response, Box<dyn Error + Send + Sync>>
{

    println!("Creating email");
    // println!("{}", create_html_body(&body, &image_url, &food_list).await);
    // return Err("Error".into());
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