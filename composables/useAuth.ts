const useAuth = () => {
  const { supabase } = useSupabase();
  const router = useRouter();

  const user = useState('user', () => null);

  supabase.auth.onAuthStateChange((e, session) => {
    user.value = session?.user || null;
  });

  const signUp = async ({ email, password, ...metadata }) => {
    const { user: u, error } = await supabase.auth.signUp(
      {
        email,
        password,
      },
      {
        data: metadata,
        redirectTo: `${window.location.origin}/my-notes?source=email`,
      }
    );

    console.log(error);

    if (error) {
      throw error;
    }
    return u;
  };

  const signIn = async ({ email, password }) => {
    const { user: u, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      throw error;
    }
    return u;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    router.push('/');
  };

  const isLoggedin = () => {
    return user.value;
  }

  return {
    user,
    signUp,
    signIn,
    signOut,
    isLoggedin,
  };
};

export default useAuth;
