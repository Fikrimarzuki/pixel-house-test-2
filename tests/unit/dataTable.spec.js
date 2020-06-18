import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import DataTable from "@/views/DataTable";
import Vuex from "vuex"
import store from "../../src/store/index"

const localVue = createLocalVue()

localVue.use(Vuex)

const wrapper = shallowMount(DataTable, { store, localVue });

describe("DataTable", () => {
  it("renders message when component is created", () => {
    expect(wrapper.name()).toMatch("data-tables")
    expect(wrapper.text()).toBeDefined()
  })

  it("have components", () => {
    expect(wrapper.findComponent({ name: "detail-modal" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "delete-modal" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "update-modal"}).exists()).toBe(true);
    expect(DataTable.components).toHaveProperty("UpdateSelectedModal");
    expect(DataTable.components).toHaveProperty("BulkUpdateSelectedModal");
    expect(DataTable.components).toHaveProperty("BulkDeleteModal");
    expect(DataTable.components).toHaveProperty("Loading");
    expect(DataTable.components).toHaveProperty("Search");
  })

  it("sets the correct default data", () => {
    expect(typeof DataTable.data).toBe("function")
    const defaultData = DataTable.data()
    expect(defaultData.showDetail).toBe(false)
    expect(defaultData.showUpdate).toBe(false)
    expect(defaultData.showDelete).toBe(false)
    expect(defaultData.showEditWithValue).toBe(false)
    expect(defaultData.showBulkEdit).toBe(false)
    expect(defaultData.index).toBeNull()
    expect(defaultData.payload).toHaveProperty("name", "")
    expect(defaultData.payload).toHaveProperty("username", "")
    expect(defaultData.payload).toHaveProperty("address", "")
    expect(defaultData.payloadSelected).toHaveProperty("name", "")
    expect(defaultData.payloadSelected).toHaveProperty("username", "")
    expect(defaultData.payloadSelected).toHaveProperty("address", "")
    expect(defaultData.selections).toHaveLength(0)
  })

  it("contains element framework", () => {
    expect(wrapper.contains("q-btn")).toBe(true)
    expect(wrapper.contains("q-page")).toBe(true)
    expect(wrapper.contains("v-table")).toBe(true)
  })

  it("has a created hook", () => {
    expect(typeof DataTable.created).toBe("function")
    expect(typeof DataTable.mounted).toBe("function")
  })

  it("correctly sets the table data when created", () => {
    expect(wrapper.vm.$store.state.tables.tableData).not.toHaveLength(0)
  })

  it("should set data", () => {
    wrapper.setData({
      index: 1,
      showUpdate: true,
      showDetail: true,
      showDelete: true,
      payload: {
        name: "Abe",
        username: "abe",
        address: "Armada"
      }
    })
    expect(wrapper.vm.index).toBe(1)
    expect(wrapper.vm.showUpdate).toBe(true)
    expect(wrapper.vm.showDetail).toBe(true)
    expect(wrapper.vm.showDelete).toBe(true)
    expect(wrapper.vm.payload).toStrictEqual({name: "Abe", username: "abe", address: "Armada" })
  })
})