// Autocomplete.test.js
import { mount } from "@vue/test-utils";
import Autocomplete from "./Autocomplete.vue";

describe("Autocomplete", () => {
  it("renders correctly", () => {
    const wrapper = mount(Autocomplete);
    expect(wrapper.html()).toContain("Search stations...");
  });
});
