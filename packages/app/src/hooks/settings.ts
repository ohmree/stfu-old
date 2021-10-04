import {AccessToken} from '@twurple/auth';
import Store from 'tauri-plugin-store-api'
import create from 'solid-zustand';
import {persist, StateStorage} from 'zustand/middleware';

const STORE = new Store('.settings.dat');
const storeWrapper: StateStorage = {
  async getItem(name) {
    return STORE.get<string>(name);
  },
  async setItem(name, value) {
    return STORE.set(name, value);
  }
};

export type Settings = {
  twitchAccessToken: string | null;
  setToken: (token: AccessToken) => void;
  getToken: () => AccessToken | null;
};

const useSettings = create<Settings>(persist((set, get) => ({
  twitchAccessToken: null,
  setToken: (token) => set({
    twitchAccessToken: JSON.stringify(token)
  }),
  getToken: () => {
    const token = get().twitchAccessToken;
    if (token) {
      return JSON.parse(token);
    } else {
      return null;
    }
  }
}), {
  name: 'stfu-storage',
  getStorage: () => storeWrapper,
}));

export default useSettings;
