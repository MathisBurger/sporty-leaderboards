use crate::dotenv_handler;
use sqlx::{mysql, Pool, MySql};
use crate::database::installation::create_tables::{create_user_accounts_table};
use crate::controller::register_controller::RegisterRequest;
use crate::database::actions;
use crate::controller::login_controller::LoginRequest;

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

    pub async fn close(&self) {
        self.conn.close().await;
    }

    pub async fn install(&self) -> bool {
        let mut counter: i8 = 0;
        if create_user_accounts_table(self).await {counter += 1;}
        return counter == 1;
    }

    pub async fn register(&self, req: &RegisterRequest) -> bool {
        return actions::register::register_user(self, req).await;
    }

    pub async fn login(&self, req: &LoginRequest) -> (bool, String) {
        return actions::login::login(self, req).await;
    }
}