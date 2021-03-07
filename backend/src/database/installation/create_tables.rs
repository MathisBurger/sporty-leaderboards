use crate::database::database_service;
use sqlx::query;

pub async fn create_keys_table(service: &database_service::DatabaseService) -> bool {
    query("CREATE TABLE key_pairs ( id serial PRIMARY KEY , client_name TEXT NOT NULL , client_key TEXT NOT NULL , timestamp BIGINT NOT NULL);")
        .execute(&service.conn).await.is_ok()
}

pub async fn create_user_accounts_table(service: &database_service::DatabaseService) -> bool {
    query("CREATE TABLE user_accounts ( id serial PRIMARY KEY , username TEXT NOT NULL , password TEXT NOT NULL , web_token VARCHAR(64) NOT NULL , mobile_token VARCHAR(64) NOT NULL , status BOOLEAN NOT NULL , created_at BIGINT NOT NULL)")
        .execute(&service.conn).await.is_ok()
}