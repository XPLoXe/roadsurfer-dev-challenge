<template>
  <div class="p-6">
    <ul class="flex flex-col space-y-3">
      <li
        v-for="booking in filteredBookings"
        :key="booking.id"
        class="flex flex-row items-center space-x-2 hover:text-blue-800 hover:underline"
        :draggable="true"
        @dragstart="handleDragStart(index, booking)"
        @dragover.prevent
      >
        <RouterLink :to="getBookingDetailLink(booking)">
          <div class="flex flex-row items-center justify-between space-x-4">
            <p class="text-sm font-bold">{{ booking.customerName }}</p>
            <p>
              {{ formatDate(booking.startDate) }} to
              {{ formatDate(booking.endDate) }}
            </p>
          </div>
        </RouterLink>
      </li>
    </ul>
    <div class="flex flex-row justify-center mt-4" v-show="isDragging">
      <img
        src="../images/fa-pen.svg"
        alt=""
        class="w-8 h-8 p-2 rounded-full ficon"
        :class="{ 'drag-hover': draggingOverEdit }"
        @dragover.prevent
        @dragenter="draggingOverEdit = true"
        @dragleave="draggingOverEdit = false"
        @drop="handleEditDrop"
      />
      <img
        src="../images/fa-trash.svg"
        alt=""
        class="w-8 h-8 p-2 rounded-full ficon"
        @click="deleteBooking(draggedItem.booking)"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  filteredBookings: Array,
});

const formatDate = (selectedDate) => {
  const date = new Date(selectedDate);
  return date.toLocaleDateString(); // Adjust the format as needed
};

const getBookingDetailLink = (booking) => {
  const bookingParam = encodeURIComponent(JSON.stringify(booking));
  const editParam = isDragging.value ? "edit=true" : "edit=false";
  return `/booking/${booking.id}?data=${bookingParam}&${editParam}`;
};

//Drag logic
const router = useRouter();
const isDragging = ref(false);
const draggedItem = ref(null);
const draggingOverEdit = ref(false);

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
const deleteBooking = (booking) => {
  console.log(`Deleting booking ${booking.id}`);
};

const editBooking = (booking) => {
  console.log(`Editing booking ${booking.id}`);
};
</script>
