import {AccessToken} from '@twurple/auth';
import Store from 'tauri-plugin-store-api';
import create from 'solid-zustand';
import {persist, StateStorage} from 'zustand/middleware';
import {tauri} from '@tauri-apps/api';

const STORE = new Store('.settings.dat');
const storeWrapper: StateStorage = {
  async getItem(name) {
    return STORE.get<string>(name);
  },
  async setItem(name, value) {
    return STORE.set(name, value);
  },
};

export interface Settings {
  twitchAccessToken: string | null;
  setToken: (token: AccessToken) => void;
  getToken: () => AccessToken | null;
  eraseToken: () => void;
}

const useSettings = create<Settings>(
  persist(
    (set, get) => ({
      twitchAccessToken: null,
      setToken: (token) => {
        void tauri.invoke('debug', {what: JSON.stringify(token)});
        set({
          twitchAccessToken: JSON.stringify(token),
        });
      },
      getToken: () => {
        const token = get().twitchAccessToken;
        if (token) {
          return JSON.parse(token) as AccessToken;
        }

        return null;
      },
      eraseToken: () => {
        set({twitchAccessToken: null});
      },
    }),
    {
      name: 'stfu-storage',
      getStorage: () => storeWrapper,
    },
  ),
);

export default useSettings;
