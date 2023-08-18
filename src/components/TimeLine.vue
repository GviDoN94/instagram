<script setup>
  import BaseContainer from '@/components/BaseContainer.vue';
  import TimeLineCard from '@/components/TimeLineCard.vue';

  const data = [
    {
      id: 1,
      username: 'selena',
      url: 'https://people.com/thmb/iappNGGhepXDJzz0vRgwfNsgi-I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(986x481:988x483)/selena-gomez-bday-072223-tout-1718660cd1f749f3b0a9f8c71e3dea0a.jpg',
      caption: 'i like violet',
    },
    {
      id: 2,
      username: 'the weekend',
      url: 'https://www.film.ru/sites/default/files/people/3733162-2552813.jpg',
      caption: 'hello guys',
    },
  ];
</script>

<template>
  <BaseContainer>
    <div class="timeline-container">
      <TimeLineCard
        v-for="post in data"
        :key="post.id"
        :post="post"
      />
    </div>
  </BaseContainer>
</template>

<style scoped>
  .timeline-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
  }
</style>
