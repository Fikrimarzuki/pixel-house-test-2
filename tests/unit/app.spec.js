import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex"
import App from "@/App.vue";

const localVue = createLocalVue()

localVue.use(Vuex)

describe("App component", () => {  
  it("return state isLoading when render", () => {
    const wrapper = shallowMount(App, {
      computed: {
        isLoading: () => false
      },
      localVue
    })
    // console.log(wrapper)
    expect(typeof App.computed.isLoading).toBe('function')
    expect(App).toHave("router-view")
  })
})
