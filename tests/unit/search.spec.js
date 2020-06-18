import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import Search from "@/views/DataTable/components/Search.vue";
import Vuex from "vuex"
import store from "../../src/store/index"

const localVue = createLocalVue()

localVue.use(Vuex)

const wrapper = mount(Search, { 
  propsData: {
    tabbleData: [
      { id: 1, name: "Abe", username: "abe", address: "atambua"}
    ]
  },
  store,
  localVue
})

describe("Search", () => {
  it("should have input", () => {
    const textInput = wrapper.findAll('input[type="text"]')
    expect(textInput).toBeTruthy()
  })

  it("should have framework component", () => {
    expect(wrapper.html()).toContain("q-input")
    expect(wrapper.html()).toContain("q-btn")
  })
})
