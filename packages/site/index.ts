import {event} from '@tauri-apps/api';
import './app.css';

const js = document.querySelector('#javascript')!;
js.className = '';
if (window.rpc) {
    const hash = document.location.hash.substr(1);
    if (hash) {
        js.innerHTML = 'You will be redirected in a moment, STFU!';
        event.emit('stfu://token', hash);
        document.location.replace(`${document.location.pathname}#token_retrieved`);
    } else {
        js.innerHTML = 'Error: Access Token not found.';
    }
} else {
    document.location.replace(`${document.location.pathname}#no_tauri`);
    js.innerHTML = 'Error: This page only works in the STFU companion app.';
}
