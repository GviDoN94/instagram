<script setup>
  import { ref } from 'vue';

  const { isLogin } = defineProps(['isLogin']);
  const visible = ref(false);
  const title = isLogin ? 'Login' : 'SingUp';
  const showModal = () => {
    visible.value = true;
  };
  const handleOk = () => {
    visible.value = false;
  };
</script>

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
      <AInput
        v-if="isLogin"
        v-model:value="value"
        placeholder="Username"
      />
      <AInput
        v-model:value="value"
        class="input"
        placeholder="Email"
      />
      <AInput
        v-model:value="value"
        class="input"
        placeholder="Password"
      />
    </AModal>
  </div>
</template>

<style scoped>
  .btn {
    margin-left: 10px;
  }

  .input {
    margin-top: 5px;
  }
</style>
