#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri_plugin_store::Store;

load_dotenv::load_dotenv!();

fn main() {
    tauri::Builder::default()
        .plugin(Store::default())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
