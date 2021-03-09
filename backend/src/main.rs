use dotenv::dotenv;
use actix_web::{HttpServer, App, web, http};
use actix_cors::Cors;


mod controller;
mod dotenv_handler;
mod database;
mod hashing;

// main function for webserver
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    let db = database::database_service::DatabaseService::new().await;
    if db.install().await {
        println!("Successfully initialized database");
    } else {
        println!("tables are already existing");
    }
    db.close().await;

    HttpServer::new(|| {
        App::new()
            .wrap(Cors::new().supports_credentials().finish())
            .route("/", web::get().to(controller::default_controller::response))
            .route("/register", web::post().to(controller::register_controller::response))
    })
        .bind("0.0.0.0:".to_owned() + &dotenv_handler::load_param("APPLICATION_PORT"))?
        .run()
        .await
}
