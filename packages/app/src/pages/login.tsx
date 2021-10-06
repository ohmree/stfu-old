import {Component, Show} from 'solid-js';
import {Fa} from 'solid-fa';
import {faTwitch} from '@fortawesome/free-brands-svg-icons';
import {parse, stringify} from '@d-fischer/qs';
import {tauri} from '@tauri-apps/api';
import {Navigate} from 'solid-app-router';
import useSettings, {Settings} from '../hooks/settings';

interface AuthorizeParameters {
  response_type: string;
  client_id: string;
  redirect_uri: string;
  scope: string;
  force_verify?: boolean;
}
interface ImplicitFlowFragment {
  access_token: string;
  scope: string;
  state?: string;
  token_type: 'bearer';
}

const queryParameters: AuthorizeParameters = {
  response_type: 'token',
  client_id: import.meta.env.VITE_TWITCH_CLIENT_ID! as string,
  redirect_uri: import.meta.env.VITE_TWITCH_REDIRECT_URL! as string,
  scope: '' /* FIXME */,
  force_verify: false /* FIXME */,
};
const authUrl = `https://id.twitch.tv/oauth2/authorize${stringify(
  queryParameters,
  {addQueryPrefix: true},
)}`;

function createFragmentParser(settings: Settings) {
  return (fragment: unknown) => {
    const parsedFragment: ImplicitFlowFragment = parse(
      fragment as string,
    ) as ImplicitFlowFragment;

    const {access_token: accessToken} = parsedFragment;
    const scope = parsedFragment.scope.split(' ');
    settings.setToken({
      accessToken,
      refreshToken: null,
      expiresIn: null,
      scope,
      obtainmentTimestamp: Date.now(),
    });
  };
}

const Login: Component = () => {
  const settings = useSettings();
  const token = settings.getToken();
  if (!token) {
    void tauri
      .invoke('emit_auth_fragment')
      .then(createFragmentParser(settings))
      .catch(() => undefined);
  }

  return (
    <Show when={!token} fallback={<Navigate href="/" />}>
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
              let location = document.location.href;
              if (!location.endsWith('/')) {
                location += '/';
              }

              void tauri.invoke('save_location', {location});
              document.location.replace(authUrl);
            }}
          >
            <Fa icon={faTwitch} w="4" h="4" m="x-2" />
            <span m="x-2" display="hidden sm:inline">
              Sign in with Twitch
            </span>
          </button>
        </div>
      </div>
    </Show>
  );
};

export default Login;
