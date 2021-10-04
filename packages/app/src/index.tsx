import 'windi.css';
import {render} from 'solid-js/web';
import {Router} from 'solid-app-router';
import App from './app';

render(
  () => {
    return (
      <Router>
        <App />
      </Router>
    );
  },
  document.querySelector('#app')!,
);
