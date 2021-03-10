use actix_web::{web, Responder, HttpRequest};
use serde::{Serialize, Deserialize};
use crate::database::database_service::DatabaseService;
use crate::database::models::user_model::OutputUserModel;

#[derive(Deserialize)]
pub struct Request {
    username: String,
    token: String,
    device: String
}

#[derive(Serialize)]
struct Response {
    status: bool,
    message: String,
    user: Vec<OutputUserModel>
}

pub async fn response(req: web::Query<Request>) -> impl Responder {
    let db = DatabaseService::new().await;
    if db.check_token_login(&req.username, &req.token, &req.device).await {
        let user = db.get_all_disabled_user().await;
        db.close().await;
        web::HttpResponse::Ok()
            .json(Response {
                status: true,
                message: "Successfully queried all disabled user".to_string(),
                user
            })
    } else {
        web::HttpResponse::Ok()
            .json(Response {
                status: false,
                message: "Wrong login credentials".to_string(),
                user: vec![]
            })
    }
}