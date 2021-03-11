use crate::database::database_service::DatabaseService;
use crate::database::models::workout_model::WorkoutModel;
use sqlx::query_as;

pub async fn  get_all_workouts_of_user(service: &DatabaseService, username: &String) -> Vec<WorkoutModel> {
    let workouts: Vec<WorkoutModel> = query_as!(WorkoutModel, "SELECT * FROM `workouts` WHERE `username`=?", username)
        .fetch_all(&service.conn).await.unwrap();
    return workouts;
}