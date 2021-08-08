import { mount, VueWrapper } from "@vue/test-utils";
import { IBaseNav } from "./BaseNav.models";
import BaseNav from "./BaseNav.vue";

describe("BaseNav", () => {
  let component: VueWrapper<IBaseNav>;

  beforeEach(() => {
    component = mount(BaseNav);
  });

  test("should render the first list", () => {
    expect(component.findAll("a")).toHaveLength(2);
  });

  test("should render the children items on click", async () => {
    await component.findAll("a")[0].trigger("click");
    expect(component.findAll("a")).toHaveLength(4);
  });

  test("should navigate back on back clicked", async () => {
    await component.findAll("a")[0].trigger("click");
    expect(component.findAll("a")).toHaveLength(4);

    await component.find("button").trigger("click");
    expect(component.findAll("a")).toHaveLength(2);
  });
});
