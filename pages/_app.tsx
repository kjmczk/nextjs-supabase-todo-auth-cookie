import { Auth } from '@supabase/ui';
import { TodoProvider } from '../context/TodoContext';
import { supabase } from '../utils/supabaseClient';

import type { AppProps } from 'next/app';

import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <TodoProvider>
        <Component {...pageProps} />
      </TodoProvider>
    </Auth.UserContextProvider>
  );
}
export default MyApp;
