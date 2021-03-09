use sqlx::{query_as, query};
use crate::database::database_service::DatabaseService;
use crate::controller::login_controller::LoginRequest;
use crate::hashing::hash;
use crate::database::models::user_model;
use crate::token;

pub async fn login(service: &DatabaseService, req: &LoginRequest) -> (bool, String) {
    let hashed_pwd = hash(&req.password);
    let elements: Vec<user_model::UserModel> = query_as!(user_model::UserModel, "SELECT * FROM `user_accounts` WHERE `username`=? AND `password`=? AND `status`='1';",
        &req.username, hashed_pwd
    ).fetch_all(&service.conn).await.unwrap();
    if elements.len() == 1 {
        let token = token::generate_token();
        if req.login_device == "web" {
            query!("UPDATE `user_accounts` SET `web_token`=? WHERE `username`=?", &token, &req.username)
                .execute(&service.conn).await;
        } else {
            query!("UPDATE `user_accounts` SET `mobile_token`=? WHERE `username`=?", &token, &req.username)
                .execute(&service.conn).await;
        }
        return (true, token);
    } else {
        return (false, String::new());
    }
}