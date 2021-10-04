import './app.css';

const js = document.querySelector('#javascript')!;
const hash = document.location.hash.substr(1);
js.className = '';
if (hash) {
  js.innerHTML = 'Redirecting...STFU!';
  document.location.replace(`stfu://${hash}`);
} else {
  js.innerHTML = 'Error: Access Token not found.';
}
