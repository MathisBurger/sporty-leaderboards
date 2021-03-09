use actix_web::{web, Responder};
use serde::{Serialize, Deserialize};
use crate::database::database_service::DatabaseService;

#[derive(Deserialize)]
pub struct RegisterRequest {
    pub username: String,
    pub password: String
}

#[derive(Serialize)]
struct Response {
    status: bool,
    message: String
}



pub async fn response(info: web::Query<RegisterRequest>) -> impl Responder {
    let db = DatabaseService::new().await;
    let status = db.register(&info.0).await;
    db.close().await;
    return web::HttpResponse::Ok()
        .json(Response{
            status,
            message: "Register endpoint called successfully".to_string()
        })
}