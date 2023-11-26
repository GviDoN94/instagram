<template>
  <BaseContainer>
    <div class="profile-container">
      <UserBar
        :key="$route.params.username"
        username="qwetqw"
        :userInfo="{
          posts: 5,
          followers: 400,
          following: 300,
        }"
        :addNewPost="addNewPost"
      />
      <ImageGallery :posts="posts" />
    </div>
  </BaseContainer>
</template>

<script setup>
  import BaseContainer from '@/components/BaseContainer.vue';
  import UserBar from '@/components/UserBar.vue';
  import ImageGallery from './ImageGallery.vue';
  import { ref } from 'vue';

  const posts = ref([]);

  const addNewPost = (post) => {
    posts.value.unshift(post);
  };
</script>

<style scoped>
  .profile-container {
    display: flex;
    flex-direction: column;
    padding: 20px 0;
  }
</style>
