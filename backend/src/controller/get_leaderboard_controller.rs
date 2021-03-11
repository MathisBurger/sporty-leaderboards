use actix_web::{Responder, web};
use serde::{Serialize, Deserialize};
use crate::database::database_service::DatabaseService;

#[derive(Deserialize)]
pub struct Request {
    pub username: String,
    pub token: String,
    pub device: String
}

#[derive(Serialize)]
struct Response {
    status: bool,
    message: String,
    leaderboard: Vec<(String, f64)>
}

pub async fn response(req: web::Query<Request>) -> impl Responder {
    let db = DatabaseService::new().await;
    if db.check_token_login(&req.username, &req.token, &req.device).await {
        let leaderboard = db.get_leaderboard().await;
        db.close().await;
        web::HttpResponse::Ok()
            .json(Response {
                status: false,
                message: "".to_string(),
                leaderboard
            })
    } else {
        db.close().await;
        web::HttpResponse::Ok()
            .json(Response {
                status: false,
                message: "Wrong login credentials".to_string(),
                leaderboard: vec![]
            })
    }
}
