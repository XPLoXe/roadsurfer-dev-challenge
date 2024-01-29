<template>
  <div class="p-6">
    <ul class="flex flex-col space-y-3">
      <li
        v-for="booking in filteredBookings"
        :key="booking.id"
        class="hover:text-blue-800 hover:underline"
      >
        <RouterLink :to="getBookingDetailLink(booking)">
          {{ booking.customerName }} - {{ formatDate(booking.startDate) }} to
          {{ formatDate(booking.endDate) }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  filteredBookings: Array,
});

const formatDate = (selectedDate) => {
  const date = new Date(selectedDate);
  return date.toLocaleDateString(); // Adjust the format as needed
};

const getBookingDetailLink = (booking) => {
  const bookingParam = encodeURIComponent(JSON.stringify(booking));
  return `/booking/${booking.id}?data=${bookingParam}`;
};
</script>
