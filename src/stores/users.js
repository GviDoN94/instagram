import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/supabase';

export const useUserStore = defineStore('users', () => {
  const user = ref(null);
  const errorMessage = ref('');
  const loading = ref(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const clearError = () => {
    errorMessage.value = '';
  };

  const handleLogin = () => {};

  const handleSingup = async (credentials) => {
    const { email, password, username } = credentials;

    if (password.length < 6) {
      errorMessage.value = 'Password length is too short';
      return;
    }

    if (username.length < 4) {
      errorMessage.value = 'Username length is too short';
      return;
    }

    if (!validateEmail(email)) {
      errorMessage.value = 'Email is invalid';
      return;
    }

    loading.value = true;

    const { data: userWithUsername } = await supabase
      .from('users')
      .select()
      .eq('username', username)
      .single();

    if (userWithUsername) {
      loading.value = false;
      errorMessage.value = 'User already registered';
      return;
    }

    errorMessage.value = '';

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      loading.value = false;
      errorMessage.value = error.message;
    }

    await supabase.from('users').insert({
      username,
      email,
    });

    const { data: newUser } = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .single();

    user.value = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    };

    loading.value = false;
  };

  const handleLogout = () => {};

  const getUser = () => {};

  return {
    user,
    errorMessage,
    loading,
    handleLogin,
    handleSingup,
    handleLogout,
    getUser,
    clearError,
  };
});