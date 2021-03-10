use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct UserModel {
    pub id: u64,
    pub username: String,
    pub password: String,
    pub web_token: String,
    pub mobile_token: String,
    pub status: i16,
    pub created_at: i64
}

#[derive(Serialize, Deserialize)]
pub struct OutputUserModel {
    pub id: u64,
    pub username: String,
    pub status: i16,
    pub created_at: i64
}