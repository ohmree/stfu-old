import {AccessToken} from '@twurple/auth';
import Store from 'tauri-plugin-store-api'

export type Settings = {
  twitchAccessToken: AccessToken;
};

const STORE = new Store('.settings.dat');

export default function useSettings(): Store {
  return STORE;
}
