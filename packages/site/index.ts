import {tauri} from '@tauri-apps/api';
import './app.css';

const js = document.querySelector('#javascript')!;
js.className = '';
if (window.rpc) {
  const hash = document.location.hash.slice(1);
  if (hash) {
    js.innerHTML = 'You will be redirected in a moment, STFU!';
    void tauri.invoke('save_auth_fragment', {fragment: hash});
    void tauri.invoke('restore_location').then((location: string) => {
      document.location.replace(location);
    });
  } else {
    js.innerHTML = 'Error: Access Token not found.';
  }
} else {
  document.location.replace(`${document.location.pathname}#no_tauri`);
  js.innerHTML = 'Error: This page only works in the STFU companion app.';
}
