#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{AppHandle, Manager};
use tauri_plugin_store::Store;
use once_cell::unsync::Lazy;

static mut PREVIOUS_LOCATION: Lazy<Option<String>> = Lazy::new(|| None);

load_dotenv::load_dotenv!();

#[tauri::command]
fn save_location(location: String) {
    unsafe {
        *PREVIOUS_LOCATION = Some(location);
    }
}

#[tauri::command]
fn restore_location(app: AppHandle) -> tauri::Result<()> {
    let location = unsafe {
        PREVIOUS_LOCATION.as_ref()
    };
    if let Some(location) = dbg!(location) {
        app.emit_all("stfu://navigate", location)
    } else {
        Ok(())
    }
}

#[tauri::command]
fn debug(what: String) {
    println!("{}", what);
}

fn main() {
    tauri::Builder::default()
        .plugin(Store::default())
        .invoke_handler(tauri::generate_handler![save_location, restore_location, debug])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
