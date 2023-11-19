<template>
  <ALayoutHeader>
    <BaseContainer>
      <div class="nav-container">
        <div class="left-content">
          <RouterLink to="/">Instagram</RouterLink>
          <AInputSearch
            v-model:value="searchUsername"
            placeholder="username..."
            style="width: 200px"
            @search="onSearch"
          />
        </div>
        <div
          v-if="!loadingUser"
          class="content"
        >
          <div
            v-if="!user"
            class="right-content"
          >
            <AuthModal :isLogin="false" />
            <AuthModal :isLogin="true" />
          </div>
          <div
            v-else
            class="right-content"
          >
            <AButton
              @click="goToUsersProfile"
              type="primary"
              >Profile</AButton
            >
            <AButton
              @click="handleLogout"
              type="primary"
              >Logout</AButton
            >
          </div>
        </div>
      </div>
    </BaseContainer>
  </ALayoutHeader>
</template>

<script setup>
  import { ref } from 'vue';
  import { RouterLink, useRouter } from 'vue-router';
  import BaseContainer from '@/components/BaseContainer.vue';
  import AuthModal from '@/components/AuthModal.vue';
  import { useUserStore } from '@/stores/users';
  import { storeToRefs } from 'pinia';

  const userStore = useUserStore();
  const { user, loadingUser } = storeToRefs(userStore);
  const router = useRouter();
  const searchUsername = ref('');

  const onSearch = () => {
    if (searchUsername.value) {
      router.push(`/profile/${searchUsername.value}`);
      searchUsername.value = '';
    }
  };

  const handleLogout = async () => {
    await userStore.handleLogout();
  };

  const goToUsersProfile = () => {
    router.push(`/profile/${user.value.username}`);
  };
</script>

<style scoped>
  .nav-container {
    display: flex;
    justify-content: space-between;
  }

  .content {
    display: flex;
    align-items: center;
  }

  .left-content {
    display: flex;
    align-items: center;
  }

  .left-content a {
    margin-right: 10px;
  }

  .right-content {
    display: flex;
    align-items: center;
  }

  .right-content button {
    margin-left: 10px;
  }
</style>
