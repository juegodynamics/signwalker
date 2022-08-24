import {render, screen} from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const fistElement = screen.getByText(/񆅁/i);
  expect(fistElement).toBeInTheDocument();
});
