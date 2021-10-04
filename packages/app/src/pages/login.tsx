import type {Component} from 'solid-js';
import {Fa} from 'solid-fa';
import {faTwitch} from '@fortawesome/free-brands-svg-icons';
import * as tauri from '@tauri-apps/api';

const Login: Component = () => {
  let authPopup: tauri.window.WebviewWindow | null | undefined;
  return (
    <div
      pos="relative top-2/5"
      w="full"
      max-w="md"
      p="x-6 y-10"
      m="auto"
      bg="white dark:gray-800"
      border="rounded-md"
      shadow="md"
    >
      <h1 text="3xl center gray-700 dark:white" font="semibold">
        Shut yo bitch ass up
      </h1>
      <div flex="~" align="items-center" m="t-6 -x-2">
        <button
          type="button"
          flex="~"
          align="items-center"
          justify="center"
          w="full"
          p="x-6 y-2"
          m="x-2"
          text="sm white"
          font="medium"
          transition="colors duration-200"
          transform="~"
          bg="purple-600 hover:purple-500 focus:purple-500"
          border="rounded-md"
          outline="focus:none"
          onClick={() => {
            if (!authPopup) {
              authPopup = new tauri.window.WebviewWindow('twitch-auth', {
                alwaysOnTop: true,
                focus: true,
                title: 'Sign in with Twitch',
                url: 'https://example.com',
              });
            }
          }}
        >
          <Fa icon={faTwitch} w="4" h="4" m="x-2" />
          <span m="x-2" display="hidden sm:inline">
            Sign in with Twitch
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;
