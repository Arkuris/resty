import { render, screen, fireEvent } from '@testing-library/react';
import assert from 'assert';
import Form from '../Components/Form/index.jsx';

describe('<Form />', () => {
  it('should submit the correct form data', () => {
    let formData;
    const handleApiCallMock = (data) => formData = data;

    render(<Form handleApiCall={handleApiCallMock} />);

    fireEvent.change(screen.getByPlaceholderText('Enter API URL'), { target: { value: 'https://api.example.com' } });
    fireEvent.click(screen.getByText('POST'));
    fireEvent.change(screen.getByText(/Body/).nextSibling, { target: { value: '{"test":"value"}' } });
    fireEvent.click(screen.getByText('GO!'));

    assert.deepStrictEqual(formData, {
      url: 'https://api.example.com',
      method: 'post',
      body: '{"test":"value"}'
    });
  });
});
