use actix_web::{web, Responder, HttpRequest};
use serde::{Serialize, Deserialize};
use crate::database::database_service::DatabaseService;

#[derive(Deserialize)]
pub struct Request {
    username: String,
    token: String,
    device: String
}

#[derive(Serialize)]
struct Response {
    status: bool,
    message: String
}

pub async fn response(req: web::Query<Request>) -> impl Responder {
    let db = DatabaseService::new().await;
    if db.check_token_login(&req.username, &req.token, &req.device).await {
        db.close().await;
        web::HttpResponse::Ok()
            .json(Response {
                status: true,
                message: "Successfully logged in".to_string()
            })
    } else {
        db.close().await;
        web::HttpResponse::Ok()
            .json(Response {
                status: false,
                message: "Login failed".to_string()
            })
    }

}