import React from "react"
import RegisterDiv from '../components/account/registerdiv/RegisterDiv';
import { fireEvent, render, act } from "@testing-library/react-native"
import { useRouter } from 'expo-router';

let fetch = require("jest-fetch-mock")

const flushMicrotasksQueue = async () => new Promise((resolve) => setTimeout(resolve, 0));

jest.mock('expo-router', () => ({
  ...jest.requireActual('expo-router'),
  useRouter: jest.fn(),
}));


describe('Register Errors', () => {
    test('Expect to show password required', async () => {
        // Set up the necessary mock data for the useRouter hook
        useRouter.mockImplementation(() => ({
            navigate: jest.fn(),
        }));
        // Assertions and test the component behavior
        const email = "test@gmail.com";
        const username = "test";
        const { getByTestId, queryAllByText } = render(<RegisterDiv />);

        const emailInput = getByTestId("Register.email");
        const usernameInput = getByTestId("Register.username");
        const button = getByTestId("Register.button");

        fireEvent.changeText(emailInput, email);
        fireEvent.changeText(usernameInput, username);
        fireEvent.press(button);
        await act(flushMicrotasksQueue);
        expect(queryAllByText("Password is required field").length).toBe(1);
        expect(queryAllByText("Confirm Password is required field").length).toBe(1);
    });

    test('Expect to show email required', async () => {
        // Set up the necessary mock data for the useRouter hook
        useRouter.mockImplementation(() => ({
            navigate: jest.fn(),
        }));
        // Assertions and test the component behavior
        const username = "test";
        const password = "11111111";
        const repeatPassword = "11111111";
        const { getByTestId, queryAllByText } = render(<RegisterDiv />);

        const usernameInput = getByTestId("Register.username");
        const passwordInput = getByTestId("Register.password");
        const repeatPasswordInput = getByTestId("Register.repeatPassword");
        const button = getByTestId("Register.button");

        fireEvent.changeText(usernameInput, username);
        fireEvent.changeText(passwordInput, password);
        fireEvent.changeText(repeatPasswordInput, repeatPassword);
        fireEvent.press(button);
        await act(flushMicrotasksQueue);
        expect(queryAllByText("Email is required field").length).toBe(1);
    });

    test('Expect to show username required', async () => {
        // Set up the necessary mock data for the useRouter hook
        useRouter.mockImplementation(() => ({
            navigate: jest.fn(),
        }));
        // Assertions and test the component behavior
        const email = "test@gmail.com";
        const password = "11111111";
        const repeatPassword = "11111111";
        const { getByTestId, queryAllByText } = render(<RegisterDiv />);

        const emailInput = getByTestId("Register.email");
        const passwordInput = getByTestId("Register.password");
        const repeatPasswordInput = getByTestId("Register.repeatPassword");
        const button = getByTestId("Register.button");

        fireEvent.changeText(emailInput, email);
        fireEvent.changeText(passwordInput, password);
        fireEvent.changeText(repeatPasswordInput, repeatPassword);
        fireEvent.press(button);
        await act(flushMicrotasksQueue);
        expect(queryAllByText("Username is required field").length).toBe(1);
    });
        
    test('Expect to show wrong email format', async () => {
        // Set up the necessary mock data for the useRouter hook
        useRouter.mockImplementation(() => ({
            navigate: jest.fn(),
        }));
        // Assertions and test the component behavior
        const username = "test";
        const email = "test@gmail..com";
        const password = "11111111";
        const repeatPassword = "11111111";
        const { getByTestId, queryAllByText } = render(<RegisterDiv />);
    
        const usernameInput = getByTestId("Register.username");
        const emailInput = getByTestId("Register.email");
        const passwordInput = getByTestId("Register.password");
        const repeatPasswordInput = getByTestId("Register.repeatPassword");
        const button = getByTestId("Register.button");
    
        fireEvent.changeText(usernameInput, username);
        fireEvent.changeText(emailInput, email);
        fireEvent.changeText(passwordInput, password);
        fireEvent.changeText(repeatPasswordInput, repeatPassword);
        fireEvent.press(button);
        await act(flushMicrotasksQueue);
        expect(queryAllByText("Wrong email format").length).toBe(1);
    });

    test('Expect to show password and re-enter password are different', async () => {
        // Set up the necessary mock data for the useRouter hook
        useRouter.mockImplementation(() => ({
            navigate: jest.fn(),
        }));
        // Assertions and test the component behavior
        const username = "test";
        const email = "test@gmail.com";
        const password = "11111111";
        const repeatPassword = "111111111";
        const { getByTestId, queryAllByText } = render(<RegisterDiv />);
    
        const usernameInput = getByTestId("Register.username");
        const emailInput = getByTestId("Register.email");
        const passwordInput = getByTestId("Register.password");
        const repeatPasswordInput = getByTestId("Register.repeatPassword");
        const button = getByTestId("Register.button");
    
        fireEvent.changeText(usernameInput, username);
        fireEvent.changeText(emailInput, email);
        fireEvent.changeText(passwordInput, password);
        fireEvent.changeText(repeatPasswordInput, repeatPassword);
        fireEvent.press(button);
        await act(flushMicrotasksQueue);
        expect(queryAllByText("Password and confirm password should be same").length).toBe(1);
    });
})

test('Renders default elements', () => {
    const { getByPlaceholderText, getAllByText } = render(<RegisterDiv />);
    getByPlaceholderText("Username");
    getByPlaceholderText("Email");
    getByPlaceholderText("Enter Password");
    getByPlaceholderText("Re-enter Password");
    expect(getAllByText("REGISTER").length).toBe(1);
});

test('Updates the state according to input', async () => {
    const username = "test";
    const email = "test@gmail.com";
    const password = "11111111";
    const repeatPassword = "111111111";
    const { getByTestId } = render(<RegisterDiv />);

    const usernameInput = getByTestId("Register.username");
    const emailInput = getByTestId("Register.email");
    const passwordInput = getByTestId("Register.password");
    const repeatPasswordInput = getByTestId("Register.repeatPassword");

    fireEvent.changeText(usernameInput, username);
    fireEvent.changeText(emailInput, email);
    fireEvent.changeText(passwordInput, password);
    fireEvent.changeText(repeatPasswordInput, repeatPassword);
    await act(flushMicrotasksQueue);
    expect(usernameInput.props.value).toBe(username);
    expect(emailInput.props.value).toBe(email);
    expect(passwordInput.props.value).toBe(password);
    expect(repeatPasswordInput.props.value).toBe(repeatPassword);
})