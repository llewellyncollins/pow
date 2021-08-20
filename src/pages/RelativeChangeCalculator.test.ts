import { mount, VueWrapper } from "@vue/test-utils";
import { IRelativeChangeCalculator } from "./RelativeChangeCalculator.models";
import RelativeChangeCalculator from "./RelativeChangeCalculator.vue";

describe("RelativeChangeCalculator", () => {
  let component: VueWrapper<IRelativeChangeCalculator>;

  beforeEach(() => {
    component = mount(RelativeChangeCalculator);
  });

  test("should not accepted non number values", async () => {
    const intialInput = component.find("#initialValue");
    const finalInput = component.find("#finalValue");
    const form = component.get("[data-test='form']");

    intialInput.setValue("aaa");
    finalInput.setValue("bbb");

    await form.trigger("click");

    const result = component.find("[data-test='result']");
    expect(result.exists()).toBe(false);
  });

  test("should calculate the relative change", async () => {
    const intialInput = component.find("#initialValue");
    const finalInput = component.find("#finalValue");
    const form = component.get("[data-test='form']");

    intialInput.setValue("555");
    finalInput.setValue("777");

    await form.trigger("submit");
    const result = component.get('[data-test="result"]');
    expect(result.text()).toContain("40%");
  });
});
