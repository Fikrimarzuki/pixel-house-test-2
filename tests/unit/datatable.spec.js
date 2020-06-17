import { shallowMount, createLocalVue } from "@vue/test-utils";
import DataTable from "@/views/DataTable";
import Vuex from "vuex"
import store from "../../src/store/index"

const localVue = createLocalVue()

localVue.use(Vuex)

const wrapper = shallowMount(DataTable, { store, localVue });

describe("DataTable", () => {
  it("has a created hook", () => {
    expect(typeof DataTable.created).toBe("function")
  })

  it('sets the correct default data', () => {
    expect(typeof DataTable.data).toBe('function')
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
    expect(defaultData.tableDataEdit).toHaveLength(0)
  })

  it('correctly sets the message when created', () => {
    expect(wrapper.vm.$store.state.tables.tableData).not.toHaveLength(0)
  })
})