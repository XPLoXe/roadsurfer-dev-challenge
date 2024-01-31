<template>
  <section
    class="flex flex-col items-center justify-center min-h-screen mx-auto space-y-4 lg:flex-row lg:space-y-0 lg:space-x-6 rounded-xl"
    id="booking-detail"
  >
    <div
      class="flex flex-col p-6 space-y-4 transition-all duration-500 bg-white shadow-xl rounded-xl hover:-translate-y-1"
    >
      <h2 class="mb-4 text-2xl font-bold">
        Information for {{ booking.customerName }}
      </h2>
      <p><b>Start Date:</b> {{ formatDate(booking.startDate) }}</p>
      <p><b>End Date:</b> {{ formatDate(booking.endDate) }}</p>
      <p><b>Duration:</b> {{ duration }} days</p>
      <p><b>Pickup Station:</b> {{ pickupStation.name }}</p>
      <RouterLink to="/" class="self-center w-40 button">
        Back to Calendar
      </RouterLink>
    </div>

    <!--Form for editing booking dates-->
    <form
      class="flex flex-col items-center justify-center p-6 space-y-4 transition-all duration-500 bg-white shadow-xl hover:-translate-y-1 rounded-xl"
      v-show="isEditMode"
      @submit.prevent.default
    >
      <div>
        <h2 class="text-2xl font-bold">Edit Booking</h2>
        <!--success message on green-->

        <p v-if="isSavingSuccess" class="text-green-500">Saving successful!</p>
      </div>
      <div>
        <label for="startDate" class="font-bold">Start Date</label>
        <input
          type="date"
          id="startDate"
          v-model="formattedStartDate"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none"
        />
      </div>
      <div>
        <label for="endDate" class="font-bold">End Date</label>
        <input
          type="date"
          id="endDate"
          v-model="formattedEndDate"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none"
        />
      </div>
      <div>
        <button class="button" type="submit" @click="saveBooking">Save</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch, computed } from "vue";

const route = useRoute();
const booking = ref({});
const isEditMode = ref(false);

//Form Logic

const isSavingSuccess = ref(false);

const saveBooking = async () => {
  // Compare the start date and end date to make sure the end date is after the start date
  if (booking.value.startDate > booking.value.endDate) {
    alert("End date must be after start date");
    return;
  } else {
    // If the dates are valid, save the booking
    // Simulated API call
    try {
      const apiCall = `PUT /api/bookings/${
        booking.value.id
      } with data: ${JSON.stringify({
        startDate: booking.value.startDate,
        endDate: booking.value.endDate,
      })}`;
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API response time
      // Output the simulated API call to the console
      console.log("Simulated API Call:", apiCall);
    } catch (error) {
      console.error("Error saving booking:", error);
      isSavingSuccess.value = false;
    }

    isSavingSuccess.value = true;
  }
};

//Parameters logic

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

//Format dates

const formatDate = (selectedDate) => {
  const date = new Date(selectedDate);
  return date.toLocaleDateString();
};

const formatDateForInput = (dateString) => {
  return dateString ? new Date(dateString).toISOString().split("T")[0] : "";
};

const formattedStartDate = computed({
  get: () => formatDateForInput(booking.value.startDate),
  set: (val) => {
    booking.value.startDate = val;
  },
});

const formattedEndDate = computed({
  get: () => formatDateForInput(booking.value.endDate),
  set: (val) => {
    booking.value.endDate = val;
  },
});

//Duration logic

const duration = computed(() => {
  const startDate = new Date(booking.value.startDate);
  const endDate = new Date(booking.value.endDate);
  const timeDifference = endDate.getTime() - startDate.getTime();
  const daysDifference = Math.trunc(timeDifference / (1000 * 3600 * 24));
  return daysDifference;
});

// Pick up station logic

const pickupStation = ref({});

//the pickup station is passed as a parameter
watch(
  () => route.query,
  (query) => {
    if (query.stationName) {
      pickupStation.value = {
        name: JSON.parse(decodeURIComponent(query.stationName)),
        id: JSON.parse(decodeURIComponent(query.stationId)),
      };
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped></style>
