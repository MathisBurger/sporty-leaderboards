use std::collections::HashMap;

pub fn bubblesort(mut arr: Vec<(String, f64)>) -> Vec<(String, f64)>{
    for i in 0..arr.len() {
        for j in 0..arr.len() - 1 {
            if arr[j].1 > arr[j + 1].1 {
                arr.swap(j, j+1);
            }
        }
    }
    return arr;
}