use sqlx::{query_as, query};
use crate::database::database_service::DatabaseService;
use crate::database::models::user_model::{UserModel, OutputUserModel};

pub async fn get_all_disabled_user(service: &DatabaseService) -> Vec<OutputUserModel> {
    let user: Vec<UserModel> = query_as!(UserModel, "SELECT * FROM `user_accounts` WHERE `status`='0';")
        .fetch_all(&service.conn).await.unwrap();
    let mut output_user: Vec<OutputUserModel> = vec![];
    for usr in user {
        output_user.push(OutputUserModel{
            id: usr.id,
            username: usr.username,
            status: usr.status,
            created_at: usr.created_at
        });
    }
    return output_user;
}