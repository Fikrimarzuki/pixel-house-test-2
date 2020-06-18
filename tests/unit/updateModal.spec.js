import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import UpdateModal from "@/views/DataTable/components/UpdateModal.vue";
import Vuex from "vuex"
import store from "../../src/store/index"

const localVue = createLocalVue()

localVue.use(Vuex)

const wrapper = mount(UpdateModal, { 
  propsData: {
    payload: {
      name: "Abe",
      username: "abe",
      address: "Singapura"
    },
    showUpdate: true,
    tableData: [
      {
        id: 1, name: "Abe", username: "abe", address: "Singapura"
      },
      {
        id: 2, name: "Banbe", username: "babe", address: "Thailand"
      }
    ]
  },
  store,
  localVue
})

describe("Update Modal", () => {
  it("should have input", () => {
    const textInput = wrapper.findAll('input[type="text"]')
    expect(textInput).toBeTruthy()
  })

  it("should have framework component", () => {
    expect(wrapper.html()).toContain("q-input")
    expect(wrapper.html()).toContain("q-btn")
  })

  it("should return data", () => {
    expect(wrapper.vm.name).toBe("Abe")
    expect(wrapper.vm.username).toBe("abe")
    expect(wrapper.vm.address).toBe("Singapura")
    expect(wrapper.vm.showUpdate).toBe(true)
    expect(wrapper.vm.tableData).toHaveLength(2)
  })
})
