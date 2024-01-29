<template>
  <div>
    <h2 class="text-3xl text-red-600 shadow-lg shadow-black">
      This is the Booking Detail View
    </h2>
    <h1 class="text-2xl">Information for {{ booking.customerName }}</h1>
    <p>Start Date: {{ formatDate(booking.startDate) }}</p>
    <p>End Date: {{ formatDate(booking.endDate) }}</p>
    <RouterLink to="/">Back to Calendar</RouterLink>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";

const route = useRoute();
const booking = ref({});

watch(
  () => route.query.data,
  (newData) => {
    if (newData) {
      booking.value = JSON.parse(decodeURIComponent(newData));
    }
  },
  { immediate: true }
);

const formatDate = (selectedDate) => {
  const date = new Date(selectedDate);
  return date.toLocaleDateString();
};
</script>

<style lang="scss" scoped></style>
