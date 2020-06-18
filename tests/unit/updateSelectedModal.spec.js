import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import UpdateSelectedModal from "@/views/DataTable/components/UpdateSelectedModal.vue";
import Vuex from "vuex"
import store from "../../src/store/index"

const localVue = createLocalVue()

localVue.use(Vuex)

const wrapper = mount(UpdateSelectedModal, { 
  propsData: {
    showEditWithValue: true,
    payloadSelected: { name: "Abe", username: "abe", address: "Atambua"},
    tableData: [{ id: 1, name: "Abe", username: "abe", address: "Atambua"}],
    selections: [{ id: 1, name: "Abe", username: "abe", address: "Atambua"}]
  },
  store,
  localVue
})

describe("Update Selected Modal", () => {
  it("should have input", () => {
    const textInput = wrapper.findAll('input[type="text"]')
    expect(textInput).toBeTruthy()
  })

  it("get data from props", () => {
    expect(wrapper.name()).toMatch("update-selected-modal")
    expect(wrapper.props("showEditWithValue")).toBe(true)
    expect(wrapper.props().payloadSelected.name).toBe("Abe")
    expect(wrapper.vm.payloadSelected.username).toMatch("abe")
    expect(wrapper.vm.payloadSelected.address).toMatch("Atambua")
  })
})
