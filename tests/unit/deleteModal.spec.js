import { mount, createLocalVue } from "@vue/test-utils";
import DeleteModal from "@/views/DataTable/components/DeleteModal.vue";
import Vuex from "vuex"
import store from "../../src/store/index"

const localVue = createLocalVue()

localVue.use(Vuex)

const wrapper = mount(DeleteModal, { store, localVue })

describe("Delete Modal", () => {
  it("should have input", () => {
    const deleteBtn = wrapper.findAll('button')
    expect(deleteBtn).toBeTruthy()
  })
})
