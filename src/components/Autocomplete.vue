<template>
  <div class="relative">
    <input
      type="text"
      v-model="searchTerm"
      @input="onSearch"
      :placeholder="placeholderText"
      class="w-full px-10 py-3 rounded-full focus:outline-none"
    />
    <ul v-if="showSuggestions" class="autocomplete-suggestions">
      <li
        v-for="suggestion in suggestions"
        v-if="suggestions.length > 0"
        :key="suggestion.id"
        @click="selectSuggestion(suggestion)"
        class="autocomplete-suggestion"
      >
        {{ suggestion.name }}
      </li>
      <li v-else class="autocomplete-no-results">No results</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineEmits, watch, toRefs, defineProps } from "vue";
import axios from "axios";

const props = defineProps({
  apiUrl: String,
  placeholderText: String,
});

const emit = defineEmits(["selection"]);
const searchTerm = ref("");
const suggestions = ref([]);
const showSuggestions = ref(false);

const onSearch = async () => {
  if (searchTerm.value) {
    try {
      const response = await axios.get(`${props.apiUrl}`);
      suggestions.value = response.data.filter((station) =>
        station.name.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
      showSuggestions.value = true;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else {
    suggestions.value = [];
    showSuggestions.value = false;
  }
};

const selectSuggestion = (suggestion) => {
  searchTerm.value = "";
  showSuggestions.value = false;
  // Emit the selected suggestion to the parent component
  emit("selection", suggestion);
};
</script>
