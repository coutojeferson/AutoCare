import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import SelectButton from '../../src/components/SelectButton';

describe('SelectButton', () => {
  let onPressMock: any;
  beforeEach(() => {
    onPressMock = jest.fn();
  });

  it('should render car button', () => {
    const { getByText } = render(
      <SelectButton value="car" onChange={onPressMock} />,
    );

    expect(getByText('Carro')).toBeTruthy();
  });

  it('should render motorcycle button', () => {
    const { getByText } = render(
      <SelectButton value="motorcycle" onChange={onPressMock} />,
    );
    expect(getByText('Moto')).toBeTruthy();
  });

  it('should call onChange with car in car button', () => {
    const { getByText } = render(
      <SelectButton value="car" onChange={onPressMock} />,
    );

    fireEvent.press(getByText('Carro'));
    expect(onPressMock).toHaveBeenCalledWith('car');
  });

  it('sould call onChange with motorcycle in motorcycle button', () => {
    const { getByText } = render(
      <SelectButton value="motorcycle" onChange={onPressMock} />,
    );

    fireEvent.press(getByText('Moto'));
    expect(onPressMock).toHaveBeenCalledWith('motorcycle');
  });
});
