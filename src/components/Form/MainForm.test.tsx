/* eslint-disable testing-library/no-node-access */
//@ts-nocheck
import MainForm, { resetForm } from "./MainForm";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../state/store"

describe("Form", () => {
  beforeEach(cleanup)

  test("Form controllers are on a page", () => {
    render(<Provider store={store}><MainForm /></Provider>);
    expect(screen.getByText('Name')).toBeInTheDocument()

    expect(screen.getByText('Height')).toBeInTheDocument()

    expect(screen.getByText('Submit')).toBeInTheDocument()

    expect(screen.getByTestId('file-upload')).toBeInTheDocument()
  })

  test("Error text is displayed after wrong argument", async () => {
    render(<Provider store={store}><MainForm /></Provider>);
    screen.getByTestId('input-name').focus()
    screen.getByTestId('input-height').focus()

    await screen.findByTestId('input-error-message')
  })

  describe("Submit button is disabled untill req fields are filled", () => {
    test("Submit button is disabled at the beginning", async () => {
      render(<Provider store={store}><MainForm /></Provider>);
      let submitButtonDisabled = screen.getByText('Submit').closest('button')?.disabled
      expect(submitButtonDisabled).toBe(true)
    })

    test("Submit button is disabled untill req fields are filled", async () => {
      render(<Provider store={store}><MainForm /></Provider>);

      const nameInput = screen.getByTestId('input-name')
      fireEvent.change(nameInput, {target: {value: 'test'}})

      let submitButtonDisabled = screen.getByText('Submit').closest('button')?.disabled
      expect(submitButtonDisabled).toBe(true)

      const heightInput = screen.getByTestId('input-height')
      fireEvent.change(heightInput, {target: {value: 30 }})

      submitButtonDisabled = screen.getByText('Submit').closest('button')?.disabled
      expect(submitButtonDisabled).toBe(true)

      const fileInput = screen.getByTestId('file-upload')
      const file = new File([""], "test.png");
      fireEvent.change(fileInput, {target: {
        files: [file],
      }})

      submitButtonDisabled = screen.getByText('Submit').closest('button')?.disabled
      expect(submitButtonDisabled).toBe(false)
    })
  })

  describe("Submitting form", () => {
    test("Isnt fired untill filled with data", () => {
      const onSubmitFn = jest.fn(e => e.preventDefault())
      render(<Provider store={store}><MainForm handleSubmit={() => onSubmitFn}/></Provider>);

      fireEvent.click(screen.getByText('Submit').closest('button'))
      expect(onSubmitFn).not.toHaveBeenCalled()
    })

    test("Submit is fired", () => {
      const onSubmitFn = jest.fn(e => e.preventDefault())
      render(<Provider store={store}><MainForm handleSubmit={() => onSubmitFn}/></Provider>);

      // Fill with data to activate button
      const nameInput = screen.getByTestId('input-name')
      fireEvent.change(nameInput, {target: {value: 'test'}})
      const heightInput = screen.getByTestId('input-height')
      fireEvent.change(heightInput, {target: {value: 30 }})
      const fileInput = screen.getByTestId('file-upload')
      const file = new File([""], "test.png");
      fireEvent.change(fileInput, {target: {
        files: [file],
      }})

      fireEvent.click(screen.getByText('Submit').closest('button'))
      expect(onSubmitFn).toHaveBeenCalled()
    })

    test("Reset form", () => {
      render(<Provider store={store}><MainForm /></Provider>);

      // Fill with data
      const nameInput = screen.getByTestId('input-name')
      fireEvent.change(nameInput, {target: {value: 'test'}})
      const heightInput = screen.getByTestId('input-height')
      fireEvent.change(heightInput, {target: {value: 30 }})
      const fileInput = screen.getByTestId('file-upload')
      const file = new File([""], 'test.png');
      fireEvent.change(fileInput, {target: {
        files: [file],
      }})

      resetForm(fileInput)

      expect(screen.getByTestId('input-name').value).toBe('')
      expect(screen.getByTestId('input-height').value).toBe('')
      expect(screen.getByTestId('file-upload').value).toBe('')
    })
  })
})