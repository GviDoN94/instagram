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
        :isFollowing="isFollowing"
        :updateIsFollowing="updateIsFollowing"
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
  import ImageGallery from '@/components/ImageGallery.vue';
  import { ref, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { supabase } from '@/supabase';
  import { useUserStore } from '@/stores/users';
  import { storeToRefs } from 'pinia';

  const route = useRoute();
  const userStore = useUserStore();
  const { username } = route.params;
  const { user: loggedInUser } = storeToRefs(userStore);

  const user = ref(null);
  const isFollowing = ref(false);
  const posts = ref([]);
  const loading = ref(false);

  const addNewPost = (post) => {
    posts.value.unshift(post);
  };

  const updateIsFollowing = (follow) => {
    isFollowing.value = follow;
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

    await fetchFollowing();

    loading.value = false;
  };

  const fetchFollowing = async () => {
    if (
      loggedInUser.value &&
      user.value &&
      loggedInUser.value.id !== user.value.id
    ) {
      const { data } = await supabase
        .from('followers_following')
        .select()
        .eq('follower_id', loggedInUser.value.id)
        .eq('following_id', user.value.id)
        .single();

      if (data) isFollowing.value = true;
    }
  };

  watch(loggedInUser, () => {
    fetchFollowing();
  });

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
