use sqlx::{query, query_as};
use crate::database::database_service;
use crate::controller::register_controller::RegisterRequest;
use crate::hashing::hash;
use std::time::{SystemTime, UNIX_EPOCH};

pub async fn register_user(service: &database_service::DatabaseService, req: &RegisterRequest) -> bool {
    let hashed_pwd = hash(&req.password);
    let timestamp = SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs();
    query!("INSERT INTO `user_accounts` (`id`, `username`, `password`, `web_token`, `mobile_token`, `status`, `created_at`) VALUES (NULL, ?, ?, 'None', 'None', '1', ?);",
       &req.username, hashed_pwd, timestamp
    ).execute(&service.conn).await.is_ok()
}