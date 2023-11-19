import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/supabase';

export const useUserStore = defineStore('users', () => {
  const user = ref(null);
  const errorMessage = ref('');
  const loading = ref(false);
  const loadingUser = ref(false);

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

  const handleLogin = async (credentials) => {
    const { email, password } = credentials;

    if (!password.length) {
      errorMessage.value = 'Password cannot be empty';
      return;
    }

    if (!validateEmail(email)) {
      errorMessage.value = 'Email is invalid';
      return;
    }

    loading.value = true;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      loading.value = false;
      errorMessage.value = error.message;
      return;
    }

    const { data: existingUser } = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .single();

    user.value = {
      id: existingUser.id,
      email: existingUser.email,
      username: existingUser.username,
    };

    loading.value = false;
    clearError();
  };

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

    clearError();

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    user.value = null;
  };

  const getUser = async () => {
    loadingUser.value = true;
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      loadingUser.value = false;
      user.value = null;
      return;
    }

    const { data: userWithEmail } = await supabase
      .from('users')
      .select()
      .eq('email', data.user.email)
      .single();

    user.value = {
      id: userWithEmail.id,
      email: userWithEmail.email,
      username: userWithEmail.username,
    };

    loadingUser.value = false;
  };

  return {
    user,
    errorMessage,
    loading,
    loadingUser,
    handleLogin,
    handleSingup,
    handleLogout,
    getUser,
    clearError,
  };
});
