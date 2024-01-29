<template>
  <div>
    <h2>Bookings for {{ formatDate(props.selectedDate) }}:</h2>
    <div v-if="filteredBookings.length > 0">
      <ul>
        <li v-for="booking in filteredBookings" :key="booking.id">
          {{ booking.customerName }} - {{ formatDate(booking.startDate) }} to
          {{ formatDate(booking.endDate) }}
        </li>
      </ul>
    </div>
    <div v-else>No bookings for this date</div>
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
