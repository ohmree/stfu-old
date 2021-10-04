#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{Manager, http::ResponseBuilder};
use tauri_plugin_store::Store;

load_dotenv::load_dotenv!();

fn main() {
    tauri::Builder::default()
        .plugin(Store::default())
        .register_uri_scheme_protocol("stfu", move |app, _request| {
            let fragment = "change me";
            app.emit_all("stfu://token", fragment)?;
            ResponseBuilder::new().body(Vec::new())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
