//@ts-nocheck
import { render, cleanup, screen } from "@testing-library/react";
import MainTable from "./MainTable";
import { Provider } from "react-redux";
import { store } from "../../state/store"
import { setItems } from "../../state/reducers/tableReducer";
window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

describe("Table", () => {
  beforeEach(cleanup)

  test("Table columns are on a page", () => {
    render(<Provider store={store}><MainTable /></Provider>);
    expect(screen.getByText('Name')).toBeInTheDocument()

    expect(screen.getByText('Height')).toBeInTheDocument()

    expect(screen.getByText('File')).toBeInTheDocument()
  })

  test("No data if there is nothing uploaded", () => {
    render(<Provider store={store}><MainTable /></Provider>);
    expect(screen.getByText('No Data')).toBeInTheDocument()
  })

  test("Inserted data are sorted by name", () => {
    const items = [{ name: "Ztest"}, { name: "Btest"}, { name: "Atest" }]
    store.dispatch(setItems(items))

    expect(store.getState().table.items).toEqual([{ name: "Atest"}, { name: "Btest" }, { name: "Ztest"}])
  })
})