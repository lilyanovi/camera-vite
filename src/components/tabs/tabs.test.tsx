import { render, screen } from '@testing-library/react';
import Tabs from './tabs';
import { Categories, Levels, Types } from '../../const';

describe('Component: Tabs', () => {
  it('should render correctly', () => {
    const fakeVendorCode = 'vendor';
    const fakeCategory = Categories.Photocamera;
    const fakeLevel = Levels.NonProfessional;
    const fakeDescription = 'description';
    const fakeType = Types.Snapshot;

    render(
      <Tabs
        vendorCode={fakeVendorCode}
        category={fakeCategory}
        level={fakeLevel}
        description={fakeDescription}
        type={fakeType}
      />
    );

    expect(screen.getByText(fakeCategory)).toBeInTheDocument();
    expect(screen.getByText(fakeVendorCode)).toBeInTheDocument();
    expect(screen.getByText(fakeLevel)).toBeInTheDocument();
    expect(screen.getByText(fakeDescription)).toBeInTheDocument();
    expect(screen.getByText(fakeType)).toBeInTheDocument();
  });
});

