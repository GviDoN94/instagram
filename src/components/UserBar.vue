<template>
  <div
    class="userbar-container"
    v-if="user"
  >
    <div class="top-content">
      <ATypographyTitle :level="2">{{ user.username }}</ATypographyTitle>
      <div v-if="user">
        <UploadPhoto
          v-if="profileUsername === loggedUser.username"
          :addNewPost="addNewPost"
        />
        <div v-else>
          <AButton
            v-if="!props.isFollowing"
            @click="followUser"
          >
            Follow
          </AButton>
          <AButton
            v-else
            @click="unfollowUser"
          >
            Following
          </AButton>
        </div>
      </div>
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
  <div
    v-else
    class="userbar-container"
  >
    <div class="top-content">
      <ATypographyTitle :level="2">User Not Found</ATypographyTitle>
    </div>
  </div>
</template>

<script setup>
  import UploadPhoto from '@/components/UploadPhoto.vue';
  import { useRoute } from 'vue-router';
  import { useUserStore } from '@/stores/users';
  import { storeToRefs } from 'pinia';
  import { supabase } from '@/supabase';

  const props = defineProps([
    'user',
    'userInfo',
    'addNewPost',
    'isFollowing',
    'updateIsFollowing',
  ]);

  const route = useRoute();
  const userStore = useUserStore();

  const { user: loggedUser } = storeToRefs(userStore);
  const { username: profileUsername } = route.params;

  const followUser = async () => {
    props.updateIsFollowing(true);
    await supabase.from('followers_following').insert({
      follower_id: loggedUser.value.id,
      following_id: props.user.id,
    });
  };

  const unfollowUser = async () => {
    props.updateIsFollowing(false);
    await supabase
      .from('followers_following')
      .delete()
      .eq('follower_id', loggedUser.value.id)
      .eq('following_id', props.user.id);
  };
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
