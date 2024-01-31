import { mount } from "@vue/test-utils";
import CalendarView from "./CalendarView.vue";

// Mock for VCalendar component
const vCalendarMock = {
  template: "<div><slot></slot></div>",
};

describe("CalendarView", () => {
  it("renders correctly", () => {
    const wrapper = mount(CalendarView, {
      global: {
        components: {
          VCalendar: vCalendarMock, // Using the mock here
        },
      },
    });
  });

  it("changes view on button click", async () => {
    const wrapper = mount(CalendarView, {
      global: {
        components: {
          VCalendar: vCalendarMock, // VCalendar mock
        },
      },
    });
    const button = wrapper.find("button"); // Find button
    await button.trigger("click"); // Click button
  });
});
