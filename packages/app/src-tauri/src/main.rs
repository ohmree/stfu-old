#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri_plugin_store::Store;
use once_cell::unsync::Lazy;

static mut PREVIOUS_LOCATION: Lazy<Option<String>> = Lazy::new(|| None);
static mut AUTH_FRAGMENT: Lazy<Option<String>> = Lazy::new(|| None);

// TODO: maybe make these a bit more DRY

#[tauri::command]
fn save_location(location: String) {
    unsafe {
        *PREVIOUS_LOCATION = Some(location);
    }
}

#[tauri::command]
fn restore_location() -> Option<String> {
    let mut location: Option<String> = None;
    unsafe {
        std::mem::swap(&mut location, &mut PREVIOUS_LOCATION);
    }

    location
}

#[tauri::command]
fn save_auth_fragment(fragment: String) {
    unsafe {
        *AUTH_FRAGMENT = Some(fragment);
    }
}

#[tauri::command]
fn emit_auth_fragment() -> Option<String> {
    let mut fragment: Option<String> = None;
    unsafe {
        std::mem::swap(&mut fragment, &mut AUTH_FRAGMENT);
    }

    fragment
}

#[tauri::command]
fn debug(what: String) {
    println!("{}", what);
}

fn main() {
    tauri::Builder::default()
        .plugin(Store::default())
        .invoke_handler(tauri::generate_handler![save_location, restore_location, save_auth_fragment, emit_auth_fragment, debug])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
