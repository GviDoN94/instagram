<template>
  <div class="timeline-container">
    <TimeLineCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
  </div>
</template>

<script setup>
  import TimeLineCard from '@/components/TimeLineCard.vue';
  import { supabase } from '@/supabase';
  import { useUserStore } from '../stores/users';
  import { storeToRefs } from 'pinia';
  import { ref, onMounted } from 'vue';

  const userStore = useUserStore();

  const { user } = storeToRefs(userStore);

  const posts = ref([]);

  const fetchData = async () => {
    const { data: followings } = await supabase
      .from('followers_following')
      .select('following_id')
      .eq('follower_id', user.value.id);

    const ownerIds = followings.map((following) => following.following_id);

    const { data } = await supabase
      .from('posts')
      .select()
      .in('owner_id', ownerIds)
      .order('created_at', { ascending: false });

    posts.value = data;
  };

  onMounted(() => fetchData());
</script>
