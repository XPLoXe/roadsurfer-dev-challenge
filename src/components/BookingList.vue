<template>
  <div class="p-4">
    <ul class="flex flex-col space-y-2">
      <li
        v-for="booking in props.filteredBookings"
        :key="booking.id"
        class="transition-all duration-300 hover:text-orange-700 hover:scale-105"
        :draggable="true"
        @dragstart="handleDragStart(index, booking)"
        @dragover.prevent
      >
        <RouterLink
          :to="getBookingDetailLink(booking)"
          class="flex flex-row items-center justify-between p-1 space-x-4 cursor-grab"
        >
          <p class="text-sm">{{ booking.customerName }}</p>
          <p class="text-xs">
            {{ formatDate(booking.startDate) }} to
            {{ formatDate(booking.endDate) }}
          </p>
        </RouterLink>
      </li>
    </ul>
    <transition name="fade">
      <div class="flex flex-row justify-around mt-4" v-show="isDragging">
        <img
          src="../images/fa-pen.svg"
          alt=""
          class="w-10 h-10 p-2 rounded-full ficon"
          :class="{ 'drag-hover': draggingOverEdit }"
          @dragover.prevent
          @dragenter="draggingOverEdit = true"
          @dragleave="draggingOverEdit = false"
          @drop="handleEditDrop"
        />
        <img
          src="../images/fa-trash.svg"
          alt=""
          class="w-10 h-10 p-2 rounded-full ficon"
          :class="{ 'drag-hover': draggingOverDelete }"
          @dragover.prevent
          @dragenter="draggingOverDelete = true"
          @dragleave="draggingOverDelete = false"
          @drop="handleDeleteDrop"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, onUnmounted, defineEmits } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  filteredBookings: Array,
  selectedStation: Object,
});

const formatDate = (selectedDate) => {
  const date = new Date(selectedDate);
  return date.toLocaleDateString(); // Adjust the format as needed
};

const getBookingDetailLink = (booking) => {
  const bookingParam = encodeURIComponent(JSON.stringify(booking));
  const editParam = isDragging.value ? "edit=true" : "edit=false";
  const stationName = encodeURIComponent(
    JSON.stringify(props.selectedStation.name)
  );
  const stationId = encodeURIComponent(
    JSON.stringify(props.selectedStation.id)
  );
  return `/booking/${booking.id}?data=${bookingParam}&${editParam}&stationName=${stationName}&stationId=${stationId}`;
};

//Drag logic
const router = useRouter();
const isDragging = ref(false);
const draggedItem = ref(null);
const draggingOverEdit = ref(false);
const draggingOverDelete = ref(false);

const handleDragStart = (index, booking) => {
  isDragging.value = true;
  draggedItem.value = booking;
};

const handleEditDrop = () => {
  if (draggingOverEdit.value && draggedItem.value) {
    router.push(getBookingDetailLink(draggedItem.value));
  }
  isDragging.value = false;
  draggingOverEdit.value = false;
};

const handleDeleteDrop = async () => {
  if (draggingOverDelete.value && draggedItem.value) {
    if (confirm("Are you sure you want to cancel this reservation?")) {
      await deleteBooking(draggedItem.value);
    }
  }
  isDragging.value = false;
  draggingOverDelete.value = false;
};

const resetDragState = () => {
  isDragging.value = false;
};

onMounted(() => {
  window.addEventListener("dragend", resetDragState);
});

onUnmounted(() => {
  window.removeEventListener("dragend", resetDragState);
});

//Handle edit and delete

const emit = defineEmits(["booking-deleted"]);

const deleteBooking = async (booking) => {
  // Simulate API call for deleting the booking
  const apiCall = `DELETE /api/bookings/${booking.id}`;

  try {
    // Simulating async API call
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API response time

    console.log("Simulated API Call:", apiCall);

    // Remove the booking from the list of bookings
    props.filteredBookings.splice(
      props.filteredBookings.findIndex((b) => b.id === booking.id),
      1
    );

    // Emit an event with the deleted booking
    emit("booking-deleted", booking);
  } catch (error) {
    console.error("Error deleting booking:", error);
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
