<template>
  <div>
    <AButton @click="showModal">Upload Photo</AButton>
    <AModal
      v-model:visible="visible"
      title="Upload Photo"
      @ok="handleOk"
    >
      <input
        type="file"
        accept=".jpeg,.png"
        @change="handleUploadChange"
      />
      <AInput
        v-model:value="caption"
        placeholder="Caption..."
        :maxLength="50"
      />
    </AModal>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { supabase } from '@/supabase';
  import { useUserStore } from '@/stores/users';
  import { storeToRefs } from 'pinia';

  const userStore = useUserStore();

  const { user } = storeToRefs(userStore);

  const visible = ref(false);
  const caption = ref('');
  const file = ref(null);

  const showModal = () => {
    visible.value = true;
  };

  const handleOk = async () => {
    const fileName = Math.floor(Math.random() * 1000000000000000);
    if (file.value) {
      const { data, error } = await supabase.storage
        .from('images')
        .upload('public/' + fileName, file.value);

      if (data) {
        await supabase.from('posts').insert({
          url: data.path,
          caption: caption.value,
          owner_id: user.value.id,
        });
      }
    }
  };

  const handleUploadChange = (e) => {
    if (e.target.files[0]) {
      file.value = e.target.files[0];
    }
  };
</script>

<style scoped>
  input {
    margin-top: 10px;
  }
</style>
