import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import BulkUpdateSelectedModal from "@/views/DataTable/components/BulkUpdateSelectedModal.vue";
import Vuex from "vuex"
import store from "../../src/store/index"

const localVue = createLocalVue()

localVue.use(Vuex)

const wrapper = mount(BulkUpdateSelectedModal, { store, localVue })

describe("Bulk Update Selected Modal", () => {
  it("should have input", () => {
    const inputText = wrapper.findAll('input[type="text"]')
    expect(inputText).toBeTruthy()
  })
})
