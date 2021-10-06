import {Component, Show} from 'solid-js';
import {Navigate} from 'solid-app-router';
import useSettings from '../hooks/settings';
/* Import {event, tauri} from '@tauri-apps/api'; */
/* Import useSettings from '../hooks/settings'; */

const Home: Component = () => {
  const settings = useSettings();
  const token = settings.getToken()!;
  return (
    <Show when={token} fallback={<Navigate href="/login" />}>
      <code>{JSON.stringify(token)}</code>
    </Show>
  );
};

export default Home;
