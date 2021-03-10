use actix_web::{Responder, web};
use serde::{Serialize, Deserialize};
use crate::database::database_service::DatabaseService;

#[derive(Deserialize)]
pub struct Request {
    pub username: String,
    pub token: String,
    pub device: String,
    pub user: String
}

#[derive(Serialize)]
struct Response {
    status: bool,
    message: String
}

pub async fn response(req: web::Json<Request>) -> impl Responder {
    let db = DatabaseService::new().await;
    if db.check_token_login(&req.username, &req.token, &req.device).await {
        db.update_user_status(&req.username, 1).await;
        web::HttpResponse::Ok()
            .json(Response {
                status: true,
                message: "Successfully accepted user".to_string()
            })
    } else {
        db.close().await;
        web::HttpResponse::Ok()
            .json(Response {
                status: false,
                message: "Wrong login credentials".to_string()
            })
    }
}