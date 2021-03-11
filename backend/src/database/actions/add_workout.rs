use sqlx::{query, query_as};
use crate::database::database_service::DatabaseService;
use std::time::{SystemTime, UNIX_EPOCH};

pub async fn add_workout(service: &DatabaseService, username: &String, time: &i64, distance: &i32) {
    query!("INSERT INTO `workouts` (`id`, `username`, `time`, `distance`, `timestamp`) VALUES (NULL, ?, ?, ?, ?);",
        username, time, distance, SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs()
    ).execute(&service.conn).await.unwrap();
}