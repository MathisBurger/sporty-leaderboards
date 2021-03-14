use actix_web::{web, Responder};
use serde::{Serialize, Deserialize};
use crate::database::database_service::DatabaseService;

#[derive(Deserialize)]
pub struct LoginRequest {
    pub username: String,
    pub password: String,
    pub login_device: String
}

#[derive(Serialize)]
struct Response {
    status: bool,
    message: String,
    token: String
}

pub async fn response(info: web::Json<LoginRequest>) -> impl Responder {

    let db = DatabaseService::new().await;

    // check login status
    let status = db.login(&info.0).await;

    db.close().await;

    if status.0 {
        web::HttpResponse::Ok()
            .json(Response {
                status: status.0,
                message: "Successfully logged in".to_string(),
                token: status.1
            })
    } else {
        web::HttpResponse::Ok()
            .json(Response {
                status: status.0,
                message: "Login failed".to_string(),
                token: "None".to_string()
            })
    }

}