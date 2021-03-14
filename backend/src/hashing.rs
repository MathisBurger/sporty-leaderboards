use pwhash::sha512_crypt;

// hashes a password
pub fn hash(pwd: &String) -> String {
    return sha512_crypt::hash(pwd).unwrap()
}