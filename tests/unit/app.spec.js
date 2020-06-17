import App from "@/App.vue";

describe("App component", () => {  
  it("return state isLoading when render", () => {
    expect(typeof App.computed.isLoading).toBe('function')
    expect(App.components).toHaveProperty("Loading")
    expect(App.components).toHaveProperty("Navbar")
  })
})
