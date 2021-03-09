use pwhash::sha512_crypt;

pub fn hash(pwd: &String) -> String {
    return sha512_crypt::hash(pwd).unwrap()
}