<template>
  <div class="flex flex-col items-center justify-center min-h-screen space-y-4">
    <div>
      <h2 class="text-3xl text-red-600 shadow-lg">
        This is the Booking Detail View
      </h2>
    </div>
    <div>
      <h2 class="text-2xl">Information for {{ booking.customerName }}</h2>
      <p>Start Date: {{ formatDate(booking.startDate) }}</p>
      <p>End Date: {{ formatDate(booking.endDate) }}</p>
    </div>
    <RouterLink to="/" class="button">Back to Calendar</RouterLink>
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
