use actix_web::{web, Responder};
use serde::{Serialize, Deserialize};
use crate::database::database_service::DatabaseService;
use crate::database::models::user_model::OutputUserModel;
use crate::controller::get_all_blocked_user_controller::{Request, Response};

pub async fn response(req: web::Query<Request>) -> impl Responder {

    let db = DatabaseService::new().await;

    // check login token
    if db.check_token_login(&req.username, &req.token, &req.device).await {

        // get all unaccepted user
        let user = db.get_all_unaccepted_user().await;

        db.close().await;

        web::HttpResponse::Ok()
            .json(Response {
                status: true,
                message: "Successfully queried all blcoked user".to_string(),
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