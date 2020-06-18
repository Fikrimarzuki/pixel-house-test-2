import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex"
import App from "@/App.vue";
import store from "../../src/store/index"

const localVue = createLocalVue()

localVue.use(Vuex)

const wrapper = shallowMount(App, { store, localVue });

describe("App component", () => {  
  it("renders message when component is created", () => {
    expect(wrapper.name()).toMatch("App")
  })
  
  it("should have components", () => {
    expect(App.components).toHaveProperty("Loading")
    expect(App.components).toHaveProperty("Navbar")
  })

  it("should have tag", () => {
    expect(wrapper.html()).toContain("router-view")
  })
})
