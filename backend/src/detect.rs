use std::collections::{HashMap, HashSet};
use reqwest;
use serde::Serialize;
use serde_json::{Value, json};
use crate::AZURE_API_KEY;
use base64::{Engine as _, engine::{self, general_purpose}, alphabet};
use base64;


pub async fn detect_image(image_url: &String) -> Result<HashMap<String, Value>, reqwest::Error> {
    let client = reqwest::Client::new();
    let image_data = client.get(image_url).send().await?.bytes().await?;
    if image_data.len() == 0 {
        return Ok(HashMap::new());
    }
    let base64_image = base64::encode(&image_data);
    let api_url = format!("https://api.clarifai.com/v2/models/{}/versions/{}/outputs",
                          "food-item-recognition", "1d5fd481e0cf4826aa72ec3ff049e044");
    let response = client.post(&api_url)
        .header("Authorization", "Key 58da21198d904a27b939b5845659ab29")
        .header("Content-Type", "application/json")
        .json(&json!({
            "user_app_id": {
                "user_id": "clarifai",
                "app_id": "main"
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "base64": base64_image
                        }
                    }
                }
            ]
        }))
        .send()
        .await?;

    response.json::<HashMap<String, Value>>().await
}

pub fn get_objects_from_response(response: &HashMap<String, Value>) -> Vec<String> {
    let mut ans = HashSet::new();
    // println!("{:?}", response);
    if let Some(outputs) = response.get("outputs") {
        if let Some(data) = outputs.get(0) {
            if let Some(data) = data.get("data") {
                if let Some(concepts) = data.get("concepts") {
                    for concept in concepts.as_array().unwrap() {
                        if let Some(name) = concept.get("name") {
                            let value = {
                                if let Some(value) = concept.get("value") {
                                    value.as_f64().unwrap()
                                } else {
                                    0.0
                                }
                            };
                            if value < 0.01 {
                                continue;                            }
                            ans.insert(name.as_str().unwrap().to_string());
                        }
                    }
                }
            }
        }
    }
    ans.iter().cloned().collect()
}