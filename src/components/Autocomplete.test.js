import { mount } from "@vue/test-utils";
import Autocomplete from "./Autocomplete.vue";
import axios from "axios";

// Mock axios
vi.mock("axios");

describe("Autocomplete", () => {
  // Test render
  it("renders correctly", () => {
    const wrapper = mount(Autocomplete);
    expect(wrapper.html()).toContain("Search stations...");
  });

  // Test suggestions display
  it("displays suggestions based on input", async () => {
    const response = {
      data: [
        { id: "1", name: "Berlin" },
        { id: "2", name: "Munich" },
      ],
    };

    axios.get.mockResolvedValue(response);

    const wrapper = mount(Autocomplete);
    const input = wrapper.find("input");

    await input.setValue("Ber");
    await wrapper.vm.$nextTick(); // Wait for view to update

    const suggestions = wrapper.findAll("li");
    expect(suggestions.length).toBe(1);
    expect(suggestions[0].text()).toBe("Berlin");
  });

  // Test station-selected event
  it("emits station-selected event when a suggestion is clicked", async () => {
    const response = {
      data: [{ id: "1", name: "Berlin" }],
    };

    axios.get.mockResolvedValue(response);

    const wrapper = mount(Autocomplete);
    await wrapper.find("input").setValue("Ber");
    await wrapper.vm.$nextTick();

    const suggestion = wrapper.find("li");
    await suggestion.trigger("click");

    expect(wrapper.emitted("station-selected")).toBeTruthy();
    expect(wrapper.emitted("station-selected")[0][0]).toEqual({
      id: "1",
      name: "Berlin",
    });
  });
});
