import { render, screen, fireEvent } from '@testing-library/react';
import assert from 'assert';
import App from '../App.jsx';

describe('<App />', () => {
  it('should display mocked API data after form submission', async () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Enter API URL'), { target: { value: 'https://api.example.com' } });
    fireEvent.click(screen.getByText('GO!'));

    // Since the apiMock has a timeout of 2000ms, we'll wait for a little longer than that
    await new Promise(r => setTimeout(r, 2100));

    const resultText = screen.getByText(/"message": "This is mocked data"/);
    assert.ok(resultText);
  });
});
