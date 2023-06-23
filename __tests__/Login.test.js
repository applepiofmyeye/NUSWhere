import React from "react"
import Login from "../components/account/logindiv/LoginDiv"
import { fireEvent, render, act } from "@testing-library/react-native"

const flushMicrotasksQueue = () =>
  new Promise((resolve) => setImmediate(resolve));

describe("Login Errors", () => {
    it("Expect to show password required", async () => {
        const email = "email@gmail.com";
        const { getByTestId, queryAllByText } = render(<Login />);

        const emailInput = getByTestId("Login.email");
        const button = getByTestId("Login.button");

        fireEvent.changeText(emailInput, email);
        fireEvent.press(button);
        await act(flushMicrotasksQueue);
        expect(queryAllByText("Password is required field").length).toBe(1);   
    });
})



