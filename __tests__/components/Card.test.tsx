import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Card } from '../../src/components/Card';
import { Vehicle } from '../../src/types/vehicle';

const mockVehicle: Vehicle = {
  id: 'vehicle-1',
  name: 'Honda Civic',
  type: 'car',
  currentKm: 50000,
  createdAt: '2024-01-01T00:00:00.000Z',
};

describe('Card', () => {
  it('should render vehicle name', () => {
    const { getByText } = render(
      <Card item={mockVehicle} onPress={() => {}} />,
    );

    expect(getByText('Honda Civic')).toBeTruthy();
  });

  it('should render formatted vehicle type', () => {
    const { getByText } = render(
      <Card item={mockVehicle} onPress={() => {}} />,
    );

    expect(getByText('Tipo: Carro')).toBeTruthy();
  });

  it('should render formatted km', () => {
    const { getByText } = render(
      <Card item={mockVehicle} onPress={() => {}} />,
    );

    expect(getByText('KM atual: 50.000 km')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const onPressMock = jest.fn();

    const { getByText } = render(
      <Card item={mockVehicle} onPress={onPressMock} />,
    );

    fireEvent.press(getByText('Honda Civic'));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
