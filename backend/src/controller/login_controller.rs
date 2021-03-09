use actix_web::{web, Responder, Result};
use serde::{Serialize, Deserialize};
use crate::database::database_service::DatabaseService;
use actix_web::web::Json;

#[derive(Deserialize)]
pub struct LoginRequest {
    pub username: String,
    pub password: String,
    pub login_device: String
}

#[derive(Serialize)]
pub struct Response {
    status: bool,
    message: String,
    token: String
}

pub async fn response(info: web::Json<LoginRequest>) -> Result<Json<Response>> {
    let db = DatabaseService::new().await;
    let status = db.login(&info.0).await;
    db.close().await;
    if status.0 {
        Ok(Json(Response {
            status: status.0,
            message: "Successfully logged in".to_string(),
            token: status.1
        }))
    } else {
        Ok(Json(Response {
            status: status.0,
            message: "Login failed".to_string(),
            token: "None".to_string()
        }))
    }

}