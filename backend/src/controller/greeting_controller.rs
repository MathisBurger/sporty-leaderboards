use actix_web::{web, Responder, Result};
use serde::Deserialize;

#[derive(Deserialize)]
pub struct GreetingRequest {
    name: String
}

pub async fn response(info: web::Json<GreetingRequest>) -> Result<String> {
    Ok(format!("Hello {}!", info.name))
}