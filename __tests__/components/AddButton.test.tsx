import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import AddButton from '../../src/components/AddButton';

describe('AddButton', () => {
  it('should call on press when pressed', () => {
    const onPressMock = jest.fn();

    const { getByText } = render(<AddButton onPress={onPressMock} />);

    fireEvent.press(getByText('+'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
