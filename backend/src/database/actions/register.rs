use sqlx::{query, query_as};
use crate::database::database_service;
use crate::controller::register_controller::RegisterRequest;
use crate::hashing::hash;
use std::time::{SystemTime, UNIX_EPOCH};
use crate::database::models::user_model::UserModel;

pub async fn register_user(service: &database_service::DatabaseService, req: &RegisterRequest) -> bool {
    let user: Vec<UserModel> = query_as!(UserModel, "SELECT * FROM `user_accounts` WHERE `username`=?", &req.username)
        .fetch_all(&service.conn).await.unwrap();
    if user.len() > 0 {
        return false;
    }
    let hashed_pwd = hash(&req.password);
    let timestamp = SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs();
    query!("INSERT INTO `user_accounts` (`id`, `username`, `password`, `web_token`, `mobile_token`, `status`, `created_at`) VALUES (NULL, ?, ?, 'None', 'None', '0', ?);",
       &req.username, hashed_pwd, timestamp
    ).execute(&service.conn).await.is_ok()
}