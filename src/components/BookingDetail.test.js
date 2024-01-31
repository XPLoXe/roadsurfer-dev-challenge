import { mount } from "@vue/test-utils";
import { createMemoryHistory, createRouter } from "vue-router";

import BookingDetail from "./BookingDetail.vue";

// Create mock router
const routes = [{ path: "/booking/:id", component: BookingDetail }];
const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

describe("BookingDetail", () => {
  it("renders booking details", async () => {
    router.push("/booking/1?data=%7B%22stationName%22%3A%22Berlin%22%7D");
    await router.isReady();
    const wrapper = mount(BookingDetail, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.text()).toContain("Information for");
    expect(wrapper.text()).toContain("Start Date:");
    expect(wrapper.text()).toContain("End Date:");
    expect(wrapper.text()).toContain("Duration:");
    expect(wrapper.text()).toContain("Pickup Station:");
  });

  it("navigates back on button click", async () => {
    const wrapper = mount(BookingDetail, {
      global: {
        plugins: [router],
      },
    });
    const button = wrapper.find("a"); // Find the button "Back to Calendar"
    await button.trigger("click");
  });
});
