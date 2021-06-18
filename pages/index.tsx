import { Auth } from '@supabase/ui';
import TodoList from '../components/TodoList';
import { useTodoContext } from '../context/TodoContext';
import { supabase } from '../utils/supabaseClient';

export default function Home() {
  const { user } = Auth.useUser();
  const { setErrorMessage } = useTodoContext();

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) setErrorMessage(error.message);
  };

  return (
    <div className="w-full h-screen bg-gray-300">
      {!user ? (
        <div className="max-w-sm mx-auto h-full flex justify-center items-center p-4">
          <Auth
            supabaseClient={supabase}
            providers={['google', 'github']}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
          />
        </div>
      ) : (
        <div className="max-w-sm mx-auto h-full flex flex-col justify-center items-center p-4">
          <TodoList user={supabase.auth.user()} />

          <button
            className="bg-gray-900 text-white w-full rounded p-2 mt-12"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
