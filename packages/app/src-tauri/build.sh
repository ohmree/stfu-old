#!/bin/sh

cargo +nightly build --release -Zbuild-std=std,panic_abort -Zbuild-std-features=panic_immediate_abort --target x86_64-"${1:-unknown-linux-gnu}"
