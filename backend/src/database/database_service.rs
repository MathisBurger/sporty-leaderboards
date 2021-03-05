use crate::dotenv_handler;
use crate::database::installation::create_tables;
use sqlx::{MySqlPool, mysql, Pool, MySql};



pub struct DatabaseService {
    connection_string: String,
    pub conn: Pool<MySql>
}

impl DatabaseService {

    pub async fn new() -> DatabaseService {
        return DatabaseService {
            connection_string: dotenv_handler::load_param("DATABASE_URL"),
            conn: mysql::MySqlPool::connect(&dotenv_handler::load_param("DATABASE_URL"))
                .await.expect("Cannot connect to database")
        };
    }

    pub fn close(&self) {
        self.conn.close();
    }

    pub async fn install(&self) -> bool {
        return create_tables::create_keys_table(self).await
    }
}