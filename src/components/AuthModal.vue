<template>
  <div>
    <AButton
      type="primary"
      @click="showModal"
      class="btn"
      >{{ title }}</AButton
    >
    <AModal
      v-model:visible="visible"
      :title="title"
      @ok="handleOk"
    >
      <template #footer>
        <AButton
          key="back"
          @click="handleCancel"
          >Cancel</AButton
        >
        <AButton
          :disabled="loading"
          key="submit"
          type="primary"
          @click="handleOk"
          >Submit</AButton
        >
      </template>
      <div
        v-if="!loading"
        class="input-container"
      >
        <AInput
          v-if="!isLogin"
          v-model:value="userCredentials.username"
          placeholder="Username"
        />
        <AInput
          v-model:value="userCredentials.email"
          class="input"
          placeholder="Email"
        />
        <AInput
          v-model:value="userCredentials.password"
          type="password"
          class="input"
          placeholder="Password"
        />
      </div>
      <div
        v-else
        class="spinner"
      >
        <ASpin />
      </div>
      <ATypographyText
        v-if="errorMessage"
        type="danger"
        >{{ errorMessage }}</ATypographyText
      >
    </AModal>
  </div>
</template>

<script setup>
  import { ref, reactive, watch } from 'vue';
  import { useUserStore } from '@/stores/users';
  import { storeToRefs } from 'pinia';

  const { isLogin } = defineProps(['isLogin']);
  const visible = ref(false);
  const title = isLogin ? 'Login' : 'SingUp';
  const userStore = useUserStore();
  const { errorMessage, loading, user } = storeToRefs(userStore);
  const userCredentials = reactive({
    email: '',
    password: '',
    username: '',
  });

  const showModal = () => {
    visible.value = true;
  };
  const handleOk = async () => {
    if (isLogin) {
      await userStore.handleLogin(userCredentials);
    } else {
      await userStore.handleSingup(userCredentials);
    }
    if (user.value) {
      visible.value = false;
    }
  };

  const handleCancel = () => {
    visible.value = false;
  };

  watch(visible, () => {
    if (visible.value === false) {
      userStore.clearError();
      (userCredentials.email = ''),
        (userCredentials.password = ''),
        (userCredentials.username = '');
    }
  });
</script>

<style scoped>
  .btn {
    margin-left: 10px;
  }

  .input {
    margin-top: 5px;
  }

  .input-container {
    height: 120px;
  }

  .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
  }
</style>
