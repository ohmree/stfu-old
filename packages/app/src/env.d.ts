// eslint-disable-next-line import/no-unassigned-import
import 'vite/client';
import {AttributifyAttributes} from 'windicss/types/jsx';

declare module 'solid-js' {
  namespace JSX {
    interface HTMLAttributes<T> extends AttributifyAttributes {}
    interface SvgSVGAttributes<T> extends Omit<AttributifyAttributes, 'opacity' | 'overflow'> {}
    // HACK: workaround for `solid-fa`.
    interface IntrinsicAttributes extends Omit<AttributifyAttributes, 'icon'> {}
  }
}

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_TWITCH_CLIENT_ID: string;
  readonly VITE_TWITCH_REDIRECT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
