import {defineConfig} from 'vite';
import solid from 'vite-plugin-solid';
import windicss from 'vite-plugin-windicss';

export default defineConfig({
  plugins: [solid(), windicss()],
});
