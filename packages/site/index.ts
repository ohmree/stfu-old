import {event} from '@tauri-apps/api';
import './app.css';

const js = document.querySelector('#javascript')!;
if (window.rpc) {
    const hash = document.location.hash.substr(1);
    const token = hash?.match(/.*access_token=([^#&]+)&/)?.[1];
    if (token) {
        js.className = '';
        document.location.replace('/#token_retrieved');
        event.emit('stfu://token', token);
    } else if (hash === 'token_retrieved') {
        js.innerHTML = 'You will be redirected in a moment, STFU!';
    } else {
        js.innerHTML = 'Error: Access Token not found.';
    }
} else {
    console.debug(js);
    document.location.replace('/#no_tauri');
    js.className = '';
    js.innerHTML = 'Error: This page only works in the STFU companion app.';
}
