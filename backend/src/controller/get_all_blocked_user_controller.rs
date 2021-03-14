use actix_web::{web, Responder};
use serde::{Serialize, Deserialize};
use crate::database::database_service::DatabaseService;
use crate::database::models::user_model::OutputUserModel;

#[derive(Deserialize)]
pub struct Request {
    pub username: String,
    pub token: String,
    pub device: String
}

#[derive(Serialize)]
pub struct Response {
    pub status: bool,
    pub message: String,
    pub user: Vec<OutputUserModel>
}

pub async fn response(req: web::Query<Request>) -> impl Responder {

    let db = DatabaseService::new().await;

    // check login token
    if db.check_token_login(&req.username, &req.token, &req.device).await {

        // get all blocked user
        let user = db.get_all_blocked_user().await;

        db.close().await;

        web::HttpResponse::Ok()
            .json(Response {
                status: true,
                message: "Successfully queried all unaccepted user".to_string(),
                user
            })
    } else {
        db.close().await;
        web::HttpResponse::Ok()
            .json(Response {
                status: false,
                message: "Wrong login credentials".to_string(),
                user: vec![]
            })
    }
}