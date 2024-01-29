<template>
  <div class="flex flex-col items-center justify-center min-h-screen space-y-6">
    <div class="items-center px-6 py-2 bg-cyan-200 rounded-xl">
      <Autocomplete @station-selected="onStationSelected" />
    </div>
    <div class="shadow-2xl">
      <VCalendar
        :initial-page="{ month: 3, year: 2021 }"
        :attributes="attr"
        v-model="selectedDate"
        @dayclick="handleDateSelect"
      >
        <template #day-popover="{ day }">
          <div
            class="text-xs font-bold text-gray-900"
            v-if="day.date === selectedDate"
          >
            <p>Bookings: {{ getBookingsForDay(day.date).length }}</p>
            <BookingList
              :filteredBookings="filteredBookings"
              :selectedDate="selectedDate"
            />
          </div>
        </template>
      </VCalendar>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import BookingList from "./BookingList.vue";
import Autocomplete from "./Autocomplete.vue";

//State for storing booking data
const bookings = ref([]);

// Function to fetch bookings for a specific station
const fetchBookingsForStation = async (stationId) => {
  try {
    const response = await axios.get(
      `https://605c94c36d85de00170da8b4.mockapi.io/stations/${stationId}`
    );
    bookings.value = response.data.bookings;

    // Create calendar attributes for start and end dates
    const startDates = bookings.value.map(
      (booking) => new Date(booking.startDate)
    );
    const endDates = bookings.value.map((booking) => new Date(booking.endDate));

    attr.value = [
      {
        dot: "blue",
        dates: startDates,
        popover: true,
      }, // Attribute for start dates
      {
        dot: "red",
        dates: endDates,
        popover: true,
      }, // Attribute for end dates
    ];
  } catch (error) {
    console.error("Error fetching bookings:", error);
  }
};

const getBookingsForDay = (date) => {
  const dateString = date.toDateString();
  return bookings.value.filter((booking) => {
    const startDate = new Date(booking.startDate).toDateString();
    const endDate = new Date(booking.endDate).toDateString();
    return startDate === dateString || endDate === dateString;
  });
};

const filteredBookings = computed(() => {
  return bookings.value.filter((booking) => {
    const startDate = new Date(booking.startDate).toDateString();
    const endDate = new Date(booking.endDate).toDateString();
    const selectedDateString = new Date(selectedDate.value).toDateString();
    return startDate === selectedDateString || endDate === selectedDateString;
  });
});

// Example: Fetch bookings for station with ID 1 on component mount
onMounted(() => {
  fetchBookingsForStation(1);
});

const selectedDate = ref(new Date());
const attr = ref([
  {
    dates: new Date(),
  },
]);

// Function to handle date selection
const handleDateSelect = (day) => {
  selectedDate.value = day.date;
  // Fetch and display booking information for the selected date here
};

//Autocomplete logic
const selectedStation = ref(null);

const onStationSelected = (station) => {
  selectedStation.value = station;
  // Fetch bookings for the selected station
  fetchBookingsForStation(station.id);
};
</script>

<style lang="scss" scoped></style>
