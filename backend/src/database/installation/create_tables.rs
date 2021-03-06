use crate::database::database_service;
use sqlx::query;

pub async fn create_user_accounts_table(service: &database_service::DatabaseService) -> bool {
    let req = query("CREATE TABLE user_accounts ( id serial PRIMARY KEY , username TEXT NOT NULL , password TEXT NOT NULL , web_token VARCHAR(64) NOT NULL , mobile_token VARCHAR(64) NOT NULL , status SMALLINT NOT NULL , created_at BIGINT NOT NULL)")
        .execute(&service.conn).await;
    if req.is_ok() {
        true
    } else {
        println!("{:?}", req.err().unwrap());
        false
    }
}

pub async fn create_workouts_table(service: &database_service::DatabaseService) -> bool {
    let req = query("CREATE TABLE `sporty-leaderboards`.`workouts` ( `id` INT NOT NULL AUTO_INCREMENT , `username` TEXT NOT NULL , `time` INT NOT NULL , `distance` INT NOT NULL , `timestamp` BIGINT UNSIGNED NOT NULL , PRIMARY KEY (`id`)) ")
        .execute(&service.conn).await;
    if req.is_ok() {
        true
    } else {
        println!("{:?}", req.err().unwrap());
        false
    }
}