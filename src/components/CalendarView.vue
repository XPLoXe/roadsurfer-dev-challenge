<template>
  <section
    class="flex flex-col items-center justify-center min-h-screen space-y-6"
    id="calendar-view"
  >
    <div
      class="flex flex-col items-center p-6 space-y-4 bg-white rounded-xl min-w-[400px] shadow-2xl hover:-translate-y-1 transition-all duration-500"
    >
      <h3 class="text-2xl font-bold">{{ selectedStation.name }} Station</h3>

      <Autocomplete
        api-url="https://605c94c36d85de00170da8b4.mockapi.io/stations"
        placeholder-text="Search for a station"
        @selection="onStationSelected"
      />
    </div>
    <div
      class="flex flex-col items-center justify-center p-3 bg-white shadow-2xl min-w-96 rounded-xl"
    >
      <VCalendar
        expanded
        :initial-page="{ month: 3, year: 2021 }"
        :attributes="attr"
        v-model="selectedDate"
        @dayclick="handleDateSelect"
        :view="view"
        class="mt-3 mb-3 border-0"
      >
        <template #day-popover="{ day }">
          <div
            class="text-xs font-bold text-gray-900"
            v-if="day.date === selectedDate"
          >
            <div class="flex flex-row items-center justify-between">
              <p>Bookings: {{ getBookingsForDay(day.date).length }}</p>
              <p class="text-slate-400">Drag to edit/delete</p>
            </div>

            <BookingList
              :filteredBookings="filteredBookings"
              :selectedStation="selectedStation"
              @booking-deleted="updateCalendar"
            />
          </div>
        </template>
      </VCalendar>
      <div class="mb-3">
        <button class="button" @click="changeView">
          {{ view === "monthly" ? "Weekly View" : "Monthly View" }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import BookingList from "./BookingList.vue";
import Autocomplete from "./Autocomplete.vue";

//State for storing booking data
const bookings = ref([]);
const selectedStation = ref({});

// Function to fetch bookings for a specific station
const fetchBookingsForStation = async (stationId) => {
  try {
    const response = await axios.get(
      `https://605c94c36d85de00170da8b4.mockapi.io/stations/${stationId}`
    );
    selectedStation.value = response.data;
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

//update calendar after booking is deleted
const updateCalendar = (deletedBooking) => {
  console.log("Deleted booking:", deletedBooking);
  bookings.value = bookings.value.filter(
    (booking) => booking.id !== deletedBooking.id
  );
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

// Default: Fetch bookings for station with ID 1 on component mount
onMounted(() => {
  console.log("Mounted");
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

const onStationSelected = (station) => {
  selectedStation.value = station;
  // Fetch bookings for the selected station
  fetchBookingsForStation(station.id);
};

//Monthly & Weekly View
const view = ref("monthly");

const changeView = () => {
  view.value = view.value === "monthly" ? "weekly" : "monthly";
};
</script>

<style lang="scss" scoped></style>
