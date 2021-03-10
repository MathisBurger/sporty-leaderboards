use sqlx::{query_as, query};
use crate::database::database_service::DatabaseService;
use crate::database::models::user_model::UserModel;

pub async fn check_token_login(service: &DatabaseService, username: &String, token: &String, device: &String) -> bool {
    let mut elements: Vec<UserModel>;
    if device == &"web".to_string() {
        elements = query_as!(UserModel, "SELECT * FROM `user_accounts` WHERE `username`=? AND `web_token`=? AND `status`='1'", &username, &token)
            .fetch_all(&service.conn).await.unwrap();
    } else {
        elements = query_as!(UserModel, "SELECT * FROM `user_accounts` WHERE `username`=? AND `mobile_token`=? AND `status`='1'", &username, &token)
            .fetch_all(&service.conn).await.unwrap();
    }
    return elements.len() == 1
}