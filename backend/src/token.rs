use rand::{Rng, thread_rng};
use rand::distributions::Alphanumeric;

pub fn generate_token() -> String {
    let token: String = thread_rng()
        .sample_iter(&Alphanumeric)
        .take(64)
        .map(char::from)
        .collect();
    return token;
}