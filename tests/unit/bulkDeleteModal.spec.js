import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import BulkDeleteModal from "@/views/DataTable/components/BulkDeleteModal.vue";
import Vuex from "vuex"
import store from "../../src/store/index"

const localVue = createLocalVue()

localVue.use(Vuex)

const wrapper = mount(BulkDeleteModal, { store, localVue })

describe("Bulk Delete Modal", () => {
  it("should have input", () => {
    const deleteBtn = wrapper.findAll('button')
    expect(deleteBtn).toBeTruthy()
  })
})
