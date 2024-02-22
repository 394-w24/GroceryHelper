use std::cmp::min;
use scraper::{Html, Selector};
use reqwest;

pub async fn get_recipes(food: &Vec<String>) -> Result<Vec<(String, String)>, reqwest::Error> {
    let index = min(3, food.len());
    let query = food[..index].join("+");
    let url = format!("https://www.allrecipes.com/search?q={}", query);
    println!("URL: {}", url);
    let resp = reqwest::get(url).await?;
    let body = resp.text().await?;
    let document = Html::parse_document(&body);

    let title_selector = Selector::parse(".card__title-text").unwrap();
    let link_selector = Selector::parse("a.mntl-card-list-items").unwrap();

    // zip the titles and links together
    let mut recipes = Vec::new();
    for (title, link) in document.select(&title_selector).zip(document.select(&link_selector)) {
        let title = title.inner_html();
        if let Some(href) = link.value().attr("href") {
            recipes.push((title, href.to_string()));
        }
    }
    println!("Recipes: {:?}", &recipes);
    Ok(recipes)
}