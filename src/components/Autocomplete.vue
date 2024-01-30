<template>
  <div class="relative">
    <input
      type="text"
      v-model="searchTerm"
      @input="onSearch"
      placeholder="Search stations..."
      class="w-full px-10 py-3 rounded-full focus:outline-none"
    />
    <ul
      v-if="showSuggestions && suggestions.length"
      class="fixed z-20 px-6 py-3 m-2 overflow-auto bg-orange-400 rounded-lg shadow-lg cursor-pointer min-h-10 max-w-36"
    >
      <li
        v-for="suggestion in suggestions"
        :key="suggestion.id"
        @click="selectStation(suggestion)"
        class="px-2 py-1 mx-auto font-bold transition-all duration-300 pointer hover:scale-110 rounded-xl"
      >
        {{ suggestion.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import axios from "axios";

const searchTerm = ref("");
const suggestions = ref([]);
const showSuggestions = ref(false);
const emit = defineEmits(["station-selected"]);

const onSearch = async () => {
  if (searchTerm.value) {
    try {
      const response = await axios.get(
        `https://605c94c36d85de00170da8b4.mockapi.io/stations`
      );
      suggestions.value = response.data.filter((station) =>
        station.name.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
      showSuggestions.value = true;
    } catch (error) {
      console.error("Error fetching stations:", error);
    }
  } else {
    suggestions.value = [];
    showSuggestions.value = false;
  }
};

const selectStation = (station) => {
  searchTerm.value = station.name;
  showSuggestions.value = false;
  // Emit an event with the selected station
  emit("station-selected", station);
  searchTerm.value = "";
};
</script>
