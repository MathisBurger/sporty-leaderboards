use crate::dotenv_handler;
use sqlx::{PgPool, postgres, Pool, Postgres};
use crate::database::installation::create_tables::{create_keys_table, create_user_accounts_table};


pub struct DatabaseService {
    connection_string: String,
    pub conn: Pool<Postgres>
}

impl DatabaseService {

    pub async fn new() -> DatabaseService {
        return DatabaseService {
            connection_string: dotenv_handler::load_param("DATABASE_URL"),
            conn: postgres::PgPool::connect(&dotenv_handler::load_param("DATABASE_URL"))
                .await.expect("Cannot connect to database")
        };
    }

    pub async fn close(&self) {
        self.conn.close().await;
    }

    pub async fn install(&self) -> bool {
        let mut counter: i8 = 0;
        if create_keys_table(self).await {counter += 1;}
        if create_user_accounts_table(self).await {counter += 1;}
        return counter == 2;
    }
}