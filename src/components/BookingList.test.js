import { createRouter, createMemoryHistory } from "vue-router";
import { mount } from "@vue/test-utils";
import BookingList from "./BookingList.vue";

const mockBookings = [
  {
    id: 1,
    customerName: "John Doe",
    startDate: "2021-01-01",
    endDate: "2021-01-07",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    startDate: "2021-01-08",
    endDate: "2021-01-15",
  },
];

const mockStation = { id: "1", name: "Berlin Station" };

describe("BookingList", () => {
  let router;

  beforeEach(() => {
    router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: "/booking/:id", name: "booking", component: {} }],
    });
  });

  it("renders a list of bookings", () => {
    const wrapper = mount(BookingList, {
      global: {
        plugins: [router],
      },
      props: {
        filteredBookings: mockBookings,
        selectedStation: mockStation,
      },
    });

    expect(wrapper.findAll("li").length).toEqual(mockBookings.length);
  });
});
