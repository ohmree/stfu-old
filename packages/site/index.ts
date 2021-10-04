import './app.css';

const js = document.querySelector('#javascript')!;
const hash = document.location.hash.substr(1);
js.className = '';
if (hash) {
  js.innerHTML = 'Redirecting...STFU!';
  const oldLocation = document.location.origin;
  document.location.replace(`stfu://${hash}`);
  document.location.replace(`${oldLocation}/#token_retrieved`);
} else {
  js.innerHTML = 'Error: Access Token not found.';
}
