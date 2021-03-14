use actix_web::{web, Responder};
use serde::{Serialize, Deserialize};
use crate::database::database_service::DatabaseService;
use crate::controller::get_all_blocked_user_controller::Request;
use crate::database::models::workout_model::WorkoutModel;

#[derive(Serialize)]
struct Response {
    status: bool,
    message: String,
    workouts: Vec<WorkoutModel>
}

pub async fn response(req: web::Query<Request>) -> impl Responder {

    let db = DatabaseService::new().await;

    // check login token
    if db.check_token_login(&req.username, &req.token, &req.device).await {

        // get all workouts of user
        let workouts = db.get_all_workouts_of_user(&req.username).await;

        db.close().await;

        web::HttpResponse::Ok()
            .json(Response {
                status: true,
                message: "Successfully queried all workouts of user".to_string(),
                workouts
            })
    } else {
        db.close().await;
        web::HttpResponse::Ok()
            .json(Response {
                status: false,
                message: "Wrong login credentials".to_string(),
                workouts: vec![]
            })
    }
}
