import { render } from '@testing-library/react-native';
import React from 'react';
import { SectionHeader } from '../../src/components/SectionHeader';

describe('SectionHeader', () => {
  let getByText: any;
  let getByTestId: any;

  beforeEach(() => {
    const rendered = render(<SectionHeader icon="oil" title="Troca de óleo" />);
    getByText = rendered.getByText;
    getByTestId = rendered.getByTestId;
  });

  it('should render icon', () => {
    expect(getByTestId('oil')).toBeTruthy();
  });

  it('should render title', () => {
    expect(getByText('Troca de óleo')).toBeTruthy();
  });
});
