<template>
  <div
    class="bg-no-repeat bg-cover bg-main-background md:bg-desktop-background"
  >
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import BookingDetail from "./components/BookingDetail.vue";
import CalendarView from "./components/CalendarView.vue";
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5 linear;
  opacity: 0;
}
</style>
