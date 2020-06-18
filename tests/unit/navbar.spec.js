import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import Navbar from "@/components/Navbar.vue";
import Vuex from "vuex"
import store from "../../src/store/index"

const localVue = createLocalVue()

localVue.use(Vuex)

const wrapper = shallowMount(Navbar, { store, localVue });

describe("Navbar component", () => {  
  it("renders message when component is created", () => {
    expect(wrapper.name()).toMatch("navbar")
  })

  it("should have tag", () => {
    expect(wrapper.html()).toContain("router-link")
  })
})
