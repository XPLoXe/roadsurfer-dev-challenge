<template>
  <div>
    <h2 class="text-3xl text-red-600 shadow-lg shadow-black">
      This is the Booking Detail View
    </h2>
    <h1 class="text-2xl">Information for the {{ bookingId }}</h1>
    <RouterLink to="/">Back to Calendar</RouterLink>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
const bookingId = route.params.id;
</script>

<style lang="scss" scoped></style>
