import React from "react"
import LoginDiv , { handleLogin } from '../components/account/logindiv/LoginDiv';
import { fireEvent, render, act } from "@testing-library/react-native"
import { useRouter } from 'expo-router';

let fetch = require("jest-fetch-mock")
const flushMicrotasksQueue = async () => new Promise((resolve) => setTimeout(resolve, 0));

jest.mock('expo-router', () => ({
  ...jest.requireActual('expo-router'),
  useRouter: jest.fn(),
}));


describe('Login Errors', () => {
    test('Expect to show password required', async () => {
        // Set up the necessary mock data for the useRouter hook
        useRouter.mockImplementation(() => ({
            navigate: jest.fn(),
        }));
        // Assertions and test the component behavior
        const email = "test@gmail.com";
        const { getByTestId, queryAllByText } = render(<LoginDiv />);

        const emailInput = getByTestId("Login.email");
        const button = getByTestId("Login.button");

        fireEvent.changeText(emailInput, email);
        fireEvent.press(button);
        await act(flushMicrotasksQueue);
        expect(queryAllByText("Password is required field").length).toBe(1);
    });

    test('Expect to show email required', async () => {
        // Set up the necessary mock data for the useRouter hook
        useRouter.mockImplementation(() => ({
            navigate: jest.fn(),
        }));
        // Assertions and test the component behavior
        const password = "11111111";
        const { getByTestId, queryAllByText } = render(<LoginDiv />);

        const passwordInput = getByTestId("Login.password");
        const button = getByTestId("Login.button");

        fireEvent.changeText(passwordInput, password);
        fireEvent.press(button);
        await act(flushMicrotasksQueue);
        expect(queryAllByText("Email is required field").length).toBe(1);
    });
        
    test('Expect to show wrong email format', async () => {
        // Set up the necessary mock data for the useRouter hook
        useRouter.mockImplementation(() => ({
            navigate: jest.fn(),
        }));
        // Assertions and test the component behavior
        const email = "test@gmail..com";
        const password = "11111111";
        const { getByTestId, queryAllByText } = render(<LoginDiv />);
    
        const emailInput = getByTestId("Login.email");
        const passwordInput = getByTestId("Login.password");
        const button = getByTestId("Login.button");
    
        fireEvent.changeText(emailInput, email);
        fireEvent.changeText(passwordInput, password);
        fireEvent.press(button);
        await act(flushMicrotasksQueue);
        expect(queryAllByText("Wrong email format").length).toBe(1);
    });
})

test('Renders default elements', () => {
    const { getByPlaceholderText } = render(<LoginDiv/>);
    getByPlaceholderText("Email");
    getByPlaceholderText("Password");
});

test('Updates the state according to input', async () => {
    const email = "test@gmail.com";
    const password = "11111111";
    const { getByTestId } = render(<LoginDiv />);

    const emailInput = getByTestId("Login.email");
    const passwordInput = getByTestId("Login.password");
    fireEvent.changeText(emailInput, email);
    fireEvent.changeText(passwordInput, password);
    await act(flushMicrotasksQueue);
    expect(emailInput.props.value).toBe(email);
    expect(passwordInput.props.value).toBe(password);
})