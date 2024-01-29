<template>
  <div>
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

<style scoped></style>
