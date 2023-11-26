<template>
  <div class="userbar-container">
    <div class="top-content">
      <ATypographyTitle :level="2">{{ username }}</ATypographyTitle>
      <UploadPhoto
        v-if="user && profileUsername === user.username"
        :addNewPost="addNewPost"
      />
    </div>
    <div class="bottom-content">
      <ATypographyTitle :level="5">{{ userInfo.posts }} posts</ATypographyTitle>
      <ATypographyTitle :level="5"
        >{{ userInfo.followers }} followers</ATypographyTitle
      >
      <ATypographyTitle :level="5"
        >{{ userInfo.following }} following</ATypographyTitle
      >
    </div>
  </div>
</template>

<script setup>
  import UploadPhoto from '@/components/UploadPhoto.vue';
  import { useRoute } from 'vue-router';
  import { useUserStore } from '@/stores/users';
  import { storeToRefs } from 'pinia';

  defineProps(['username', 'userInfo', 'addNewPost']);

  const route = useRoute();
  const userStore = useUserStore();

  const { user } = storeToRefs(userStore);
  const { username: profileUsername } = route.params;
</script>

<style scoped>
  .userbar-container {
    padding-bottom: 75px;
  }

  .bottom-content {
    display: flex;
    align-items: center;
  }

  .bottom-content h5 {
    margin: 0 !important;
    padding: 0;
    margin-right: 30px !important;
  }

  .top-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
