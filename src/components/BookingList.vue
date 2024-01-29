<template>
  <div>
    <div>
      <ul>
        <li v-for="booking in filteredBookings" :key="booking.id">
          <RouterLink :to="`/booking/${booking.id}`">
            {{ booking.customerName }} - {{ formatDate(booking.startDate) }} to
            {{ formatDate(booking.endDate) }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  filteredBookings: Array,
  selectedDate: Date,
});

const formatDate = (selectedDate) => {
  const date = new Date(selectedDate);
  return date.toLocaleDateString(); // Adjust the format as needed
};
</script>
