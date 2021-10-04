import {defineConfig} from 'windicss/helpers';
import forms from 'windicss/plugin/forms';
import typography from 'windicss/plugin/typography';

export default defineConfig({
  darkMode: 'media',
  safelist: 'p-3 p-4 p-5',
  attributify: true,
  extract: {
    include: ['src/**/*.tsx', 'index.html'],
  },
  plugins: [forms, typography],
});
