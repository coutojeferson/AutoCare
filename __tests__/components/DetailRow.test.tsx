import { render } from '@testing-library/react-native';
import React from 'react';
import { DetailRow } from '../../src/components/DetailRow';

describe('DetailRow', () => {
  let getByText: any;
  let getByTestId: any;

  beforeEach(() => {
    const rendered = render(
      <DetailRow icon="clock" label="Última troca" value="1000 km" />,
    );
    getByText = rendered.getByText;
    getByTestId = rendered.getByTestId;
  });

  it('should render icon', () => {
    expect(getByTestId('clock')).toBeTruthy();
  });

  it('should render label', () => {
    expect(getByText('Última troca')).toBeTruthy();
  });

  it('should render value', () => {
    expect(getByText('1000 km')).toBeTruthy();
  });
});
