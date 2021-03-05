use crate::database::database_service;
use sqlx::query;

pub async fn create_keys_table(service: &database_service::DatabaseService) -> bool {
    query("CREATE TABLE `key_pairs` ( `id` INT NOT NULL AUTO_INCREMENT , `client_name` TEXT NOT NULL , `client_key` TEXT NOT NULL , `timestamp` BIGINT NOT NULL , PRIMARY KEY (`id`));")
        .execute(&service.conn).await.is_ok()
}