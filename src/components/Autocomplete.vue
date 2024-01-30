<template>
  <div>
    <input
      type="text"
      v-model="searchTerm"
      @input="onSearch"
      placeholder="Search stations..."
      class="w-full px-10 py-3 rounded-full focus:outline-none"
    />
    <ul v-if="showSuggestions && suggestions.length" class="cursor-pointer">
      <li
        v-for="suggestion in suggestions"
        :key="suggestion.id"
        @click="selectStation(suggestion)"
        class="pointer hover:bg-gray-200"
      >
        {{ suggestion.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
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
};
</script>
