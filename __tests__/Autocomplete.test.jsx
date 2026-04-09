import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Autocomplete from '../components/Autocomplete';

// Mock dependencies that aren't under test
jest.mock('react-native-paper', () => {
  const { View, Text, TextInput, TouchableOpacity } = require('react-native');
  return {
    TextInput: (props) => <TextInput {...props} />,
    Menu: {
      Item: ({ title, onPress }) => (
        <TouchableOpacity onPress={onPress} testID={`menu-item-${title}`}>
          <Text>{title}</Text>
        </TouchableOpacity>
      ),
    },
  };
});

jest.mock('../constants', () => ({
  COLORS: { background: '#fff', text: '#000' },
}));

jest.mock('../data/venues', () => ({
  roomCodeCoords: new Map(),
  buildingCoords: new Map(),
  roomCodes: [],
  buildings: [],
}));

const DATA = ['COM1', 'COM2', 'COM3', 'AS1', 'AS2', 'FASS', 'UTown', 'YIH', 'CLB', 'BIZ1'];

function renderAutocomplete(overrides = {}) {
  return render(
    <Autocomplete
      value=""
      label="Where are you?"
      data={DATA}
      onChange={() => {}}
      {...overrides}
    />
  );
}

describe('Autocomplete dropdown', () => {
  it('shows filtered results when text is entered', () => {
    const { getByPlaceholderText, getByText } = renderAutocomplete();
    fireEvent.changeText(getByPlaceholderText('Where are you?'), 'COM');
    expect(getByText('COM1')).toBeTruthy();
    expect(getByText('COM2')).toBeTruthy();
    expect(getByText('COM3')).toBeTruthy();
  });

  it('shows "No such venue." for unrecognised input', () => {
    const { getByPlaceholderText, getByText } = renderAutocomplete();
    fireEvent.changeText(getByPlaceholderText('Where are you?'), 'zzzzz');
    expect(getByText('No such venue.')).toBeTruthy();
  });

  it('hides dropdown when input is cleared', () => {
    const { getByPlaceholderText, queryByText } = renderAutocomplete();
    const input = getByPlaceholderText('Where are you?');
    fireEvent.changeText(input, 'COM');
    fireEvent.changeText(input, '');
    expect(queryByText('COM1')).toBeNull();
  });

  it('ScrollView has maxHeight so the list is bounded and scrollable', () => {
    const { getByPlaceholderText, UNSAFE_getByType } = renderAutocomplete();
    fireEvent.changeText(getByPlaceholderText('Where are you?'), 'COM');

    const { ScrollView } = require('react-native');
    const scrollView = UNSAFE_getByType(ScrollView);
    expect(scrollView.props.style).toMatchObject({ maxHeight: 200 });
  });

  it('ScrollView has nestedScrollEnabled for use inside outer ScrollViews', () => {
    const { getByPlaceholderText, UNSAFE_getByType } = renderAutocomplete();
    fireEvent.changeText(getByPlaceholderText('Where are you?'), 'COM');

    const { ScrollView } = require('react-native');
    const scrollView = UNSAFE_getByType(ScrollView);
    expect(scrollView.props.nestedScrollEnabled).toBe(true);
  });

  it('ScrollView has keyboardShouldPersistTaps="handled" so items are tappable', () => {
    const { getByPlaceholderText, UNSAFE_getByType } = renderAutocomplete();
    fireEvent.changeText(getByPlaceholderText('Where are you?'), 'COM');

    const { ScrollView } = require('react-native');
    const scrollView = UNSAFE_getByType(ScrollView);
    expect(scrollView.props.keyboardShouldPersistTaps).toBe('handled');
  });
});
