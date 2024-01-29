<template>
  <div class="flex flex-col items-center justify-center min-h-screen space-y-6">
    <div class="items-center px-6 py-2 bg-cyan-200 rounded-xl">
      <h2 class="text-xl font-bold">Calendar</h2>
    </div>
    <div>
      <VCalendar />
    </div>
    <RouterLink to="/booking/1">Booking 1</RouterLink>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
