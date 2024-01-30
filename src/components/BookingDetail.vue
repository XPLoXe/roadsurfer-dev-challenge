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

    <!--Form for editing booking dates-->
    <div
      class="flex flex-col items-center justify-center space-y-4"
      v-show="isEditMode"
    >
      <div>
        <h2 class="text-2xl">Edit Booking</h2>
      </div>
      <div>
        <label for="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          v-model="booking.startDate"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none"
        />
      </div>
      <div>
        <label for="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          v-model="booking.endDate"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none"
        />
      </div>
      <div>
        <button class="button" @click="saveBooking">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";

const route = useRoute();
const booking = ref({});
const isEditMode = ref(false);

watch(
  () => route.query,
  (query) => {
    if (query.data) {
      booking.value = JSON.parse(decodeURIComponent(query.data));
    }
    isEditMode.value = query.edit === "true";
  },
  { immediate: true }
);

const formatDate = (selectedDate) => {
  const date = new Date(selectedDate);
  return date.toLocaleDateString();
};
</script>

<style lang="scss" scoped></style>
