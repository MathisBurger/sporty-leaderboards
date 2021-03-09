use serde::{Serialize, Deserialize};

pub struct UserModel {
    pub id: u64,
    pub username: String,
    pub password: String,
    pub web_token: String,
    pub mobile_token: String,
    pub status: i8,
    pub created_at: i64
}