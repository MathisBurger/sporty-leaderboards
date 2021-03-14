use actix_web::{web, Responder, HttpRequest};
use serde::{Serialize, Deserialize};
use crate::database::database_service::DatabaseService;


#[derive(Deserialize)]
pub struct Request {
    username: String,
    token: String,
    device: String,
    time: i64,
    distance: i32
}

#[derive(Serialize)]
struct Response {
    status: bool,
    message: String
}

pub async fn response(req: web::Json<Request>) -> impl Responder {

    let db = DatabaseService::new().await;

    // check login token
    if db.check_token_login(&req.username, &req.token, &req.device).await {

        // add workout
        db.add_workout(&req.username, &req.time, &req.distance).await;
        web::HttpResponse::Ok()
            .json(Response {
                status: true,
                message: "Successfully added workout for user".to_string()
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