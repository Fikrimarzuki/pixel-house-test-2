import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import DetailModal from "@/views/DataTable/components/DetailModal.vue";
import Vuex from "vuex"
import store from "../../src/store"

const localVue = createLocalVue()

localVue.use(Vuex)

const wrapper = mount(DetailModal, {
  propsData: {
    payload: {
      name: "Abe",
      username: "abe",
      address: "Singapura"
    },
    showDetail: true
  },
  store,
  localVue
})

describe("Detail Modal", () => {
  it("should return data", () => {
    expect(wrapper.name()).toMatch("detail-modal")
    expect(wrapper.props("showDetail")).toBe(true)
    expect(wrapper.props().payload.name).toBe("Abe")
    expect(wrapper.vm.payload.username).toMatch("abe")
    expect(wrapper.vm.payload.address).toMatch("Singapura")
    expect(wrapper.vm.modalDetail).toBe(true)
  })

  it("should have text", () => {
    expect(wrapper.text()).toContain("Name")
    expect(wrapper.text()).toContain("Username")
    expect(wrapper.text()).toContain("Address")
  })
})