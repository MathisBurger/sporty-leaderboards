use sqlx::{query_as, query};
use crate::database::database_service::DatabaseService;

pub async fn update_user_status(service: &DatabaseService, username: &String, status: &i16) {
    query!("UPDATE `user_accounts` SET `status`=? WHERE `username`=?", status, username)
        .execute(&service.conn).await.unwrap();
}