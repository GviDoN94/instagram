<script setup>
  import { ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import BaseContainer from '@/components/BaseContainer.vue';
  import AuthModal from '@/components/AuthModal.vue';

  const searchUsername = ref('');
  const isAuthenticated = ref(false);

  const onSearch = () => {};
</script>

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
          v-if="!isAuthenticated"
          class="right-content"
        >
          <AuthModal />
          <AuthModal :isLogin="true" />
        </div>
        <div
          v-else
          class="right-content"
        >
          <AButton type="primary">Profile</AButton>
          <AButton type="primary">Logout</AButton>
        </div>
      </div>
    </BaseContainer>
  </ALayoutHeader>
</template>

<style scoped>
  .nav-container {
    display: flex;
    justify-content: space-between;
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
