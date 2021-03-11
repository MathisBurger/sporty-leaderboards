use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct WorkoutModel {
    pub id: i32,
    pub username: String,
    pub time: i32,
    pub distance: i32,
    pub timestamp: u64
}