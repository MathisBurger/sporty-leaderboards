use sqlx::{query_as, query};
use crate::database::database_service::DatabaseService;
use crate::database::models::user_model::UserModel;

pub async fn check_token_login(service: &DatabaseService, username: &String, token: &String, device: &String) -> bool {
    let mut elements: Vec<UserModel>;

    // check device type
    if device == &"web".to_string() {
        // get all matching data
        elements = query_as!(UserModel, "SELECT * FROM `user_accounts` WHERE `username`=? AND `web_token`=? AND `status`='1'", &username, &token)
            .fetch_all(&service.conn).await.unwrap();
    } else {
        // get all matching data
        elements = query_as!(UserModel, "SELECT * FROM `user_accounts` WHERE `username`=? AND `mobile_token`=? AND `status`='1'", &username, &token)
            .fetch_all(&service.conn).await.unwrap();
    }

    // check if data matches
    return elements.len() == 1
}