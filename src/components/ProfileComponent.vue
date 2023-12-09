<template>
  <BaseContainer>
    <div
      v-if="!loading"
      class="profile-container"
    >
      <UserBar
        :key="$route.params.username"
        :user="user"
        :userInfo="{
          posts: 5,
          followers: 400,
          following: 300,
        }"
        :addNewPost="addNewPost"
      />
      <ImageGallery :posts="posts" />
    </div>
    <div
      v-else
      class="spinner"
    >
      <ASpin />
    </div>
  </BaseContainer>
</template>

<script setup>
  import BaseContainer from '@/components/BaseContainer.vue';
  import UserBar from '@/components/UserBar.vue';
  import ImageGallery from './ImageGallery.vue';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { supabase } from '@/supabase';

  const route = useRoute();
  const user = ref(null);
  const { username } = route.params;
  const posts = ref([]);
  const loading = ref(false);

  const addNewPost = (post) => {
    posts.value.unshift(post);
  };

  const fetchData = async () => {
    loading.value = true;

    const { data: userData } = await supabase
      .from('users')
      .select()
      .eq('username', username)
      .single();

    if (!userData) {
      loading.value = false;
      return (user.value = null);
    }

    user.value = userData;

    const { data: postsData } = await supabase
      .from('posts')
      .select()
      .eq('owner_id', user.value.id);

    posts.value = postsData;

    loading.value = false;
  };

  onMounted(() => {
    fetchData();
  });
</script>

<style scoped>
  .profile-container {
    display: flex;
    flex-direction: column;
    padding: 20px 0;
  }

  .spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 85vh;
  }
</style>
