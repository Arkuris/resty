import { render, screen } from '@testing-library/react';
import assert from 'assert';
import Results from '../Components/Results/index.jsx';

describe('<Results />', () => {
  it('should display the provided data', () => {
    const mockData = { message: 'This is a test message' };
    render(<Results data={mockData} />);

    const resultText = screen.getByText(/"message": "This is a test message"/);
    assert.ok(resultText);
  });
});
