import { mount } from "@vue/test-utils";
import Autocomplete from "./Autocomplete.vue";
import axios from "axios";

// Mock axios
vi.mock("axios");

describe("Autocomplete", () => {
  // Test render
  it("renders correctly", () => {
    const wrapper = mount(Autocomplete, {
      props: {
        apiUrl: "https://605c94c36d85de00170da8b4.mockapi.io/stations",
        placeholderText: "Search stations...",
      },
    });
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

    const wrapper = mount(Autocomplete, {
      props: {
        apiUrl: "https://605c94c36d85de00170da8b4.mockapi.io/stations",
      },
    });
    const input = wrapper.find("input");

    await input.setValue("Ber");
    await wrapper.vm.$nextTick(); // Wait for view to update

    const suggestions = wrapper.findAll("li");
    expect(suggestions.length).toBe(1);
    expect(suggestions[0].text()).toBe("Berlin");
  });

  // Test station-selected event
  it("emits selection event when a suggestion is clicked", async () => {
    const response = {
      data: [{ id: "1", name: "Berlin" }],
    };

    axios.get.mockResolvedValue(response);

    const wrapper = mount(Autocomplete, {
      props: {
        apiUrl: "https://605c94c36d85de00170da8b4.mockapi.io/stations",
      },
    });
    await wrapper.find("input").setValue("Ber");
    await wrapper.vm.$nextTick();

    const suggestion = wrapper.find("li");
    await suggestion.trigger("click");

    expect(wrapper.emitted("selection")).toBeTruthy();
    expect(wrapper.emitted("selection")[0][0]).toEqual({
      id: "1",
      name: "Berlin",
    });
  });
});
