use crate::dotenv_handler;
use sqlx::{mysql, Pool, MySql};
use crate::database::installation::create_tables::{create_user_accounts_table, create_workouts_table};
use crate::controller::register_controller::RegisterRequest;
use crate::database::actions;
use crate::controller::login_controller::LoginRequest;
use crate::database::models::user_model::OutputUserModel;
use std::iter::Map;
use std::collections::HashMap;
use crate::database::models::workout_model::WorkoutModel;


pub struct DatabaseService {
    connection_string: String,
    pub conn: Pool<MySql>
}

impl DatabaseService {

    pub async fn new() -> DatabaseService {
        return DatabaseService {
            connection_string: dotenv_handler::load_param("DATABASE_URL"),
            conn: mysql::MySqlPool::connect(&dotenv_handler::load_param("DATABASE_URL"))
                .await.expect("Cannot connect to database")
        };
    }

    pub async fn close(&self) {
        self.conn.close().await;
    }

    pub async fn install(&self) -> bool {
        let mut counter: i8 = 0;
        if create_user_accounts_table(self).await {counter += 1;}
        if create_workouts_table(self).await {counter += 1;}
        return counter == 2;
    }

    pub async fn register(&self, req: &RegisterRequest) -> bool {
        return actions::register::register_user(self, req).await;
    }

    pub async fn login(&self, req: &LoginRequest) -> (bool, String) {
        return actions::login::login(self, req).await;
    }

    pub async fn check_token_login(&self, username: &String, token: &String, device: &String) -> bool {
        return actions::check_token_login::check_token_login(self, username, token, device).await;
    }

    pub async fn get_all_blocked_user(&self) -> Vec<OutputUserModel> {
        return actions::get_all_user_with_status::get_all_user_with_status(self, &2).await;
    }

    pub async fn get_all_unaccepted_user(&self) -> Vec<OutputUserModel> {
        return actions::get_all_user_with_status::get_all_user_with_status(self, &0).await;
    }

    pub async fn get_all_accepted_user(&self) -> Vec<OutputUserModel> {
        return actions::get_all_user_with_status::get_all_user_with_status(self, &1).await;
    }

    pub async fn update_user_status(&self, username: &String, status: i16) {
        actions::update_user_status::update_user_status(self, username, &status).await;
    }

    pub async fn add_workout(&self, username: &String, time: &i64, distance: &i32) {
        actions::add_workout::add_workout(self, username, time, distance).await;
    }

    pub async fn get_all_workouts_of_user(&self, username: &String) -> Vec<WorkoutModel> {
        return actions::get_all_workouts::get_all_workouts_of_user(self, username).await;
    }

    pub async fn get_leaderboard(&self) -> Vec<(String, f64)> {
        let mut scores: Vec<(String, f64)> = vec![];
        let user = self.get_all_accepted_user().await;
        for usr in user {
            let mut score: f64 = 0.0;
            let workouts = actions::get_all_workouts::get_all_workouts_of_user(self, &usr.username).await;
            for workout in workouts {
                score += (((workout.distance * workout.time) / 1000000) as f64).ceil();
            }
            scores.push((usr.username, score));
        }
        return crate::Bubblesort::bubblesort(scores);
    }
}