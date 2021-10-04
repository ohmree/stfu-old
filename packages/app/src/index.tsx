import 'windi.css';
import {render} from 'solid-js/web';
import {Router} from 'solid-app-router';
import App from './app';
import {Twitch} from '@ohmree/solid-twitch-auth';
import useSettings from './hooks/settings';
import {lazy} from 'solid-js';

const Login = lazy(async () => import('./pages/login'));

render(
  () => {
    const settings = useSettings();

    return (
      <Twitch
        clientId={import.meta.env.VITE_TWITCH_CLIENT_ID! as string}
        clientSecret={import.meta.env.VITE_TWITCH_CLIENT_SECRET! as string}
        redirectUri={import.meta.env.VITE_TWITCH_REDIRECT_URL! as string}
        onRefresh={(newTokenData: unknown) => settings.set('twitchAccessToken', newTokenData)}
        fallback={<Login />}
      >
        <Router>
          <App />
        </Router>
      </Twitch>
    );
  },
  document.querySelector('#app')!,
);
