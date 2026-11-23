import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';

function renderAt(path) {
  window.history.pushState({}, '', path);
  return render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

beforeAll(() => {
  window.scrollTo = jest.fn();
});

test('shows the login page at the root', () => {
  renderAt('/');
  expect(screen.getByText(/For Booklovers!/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
});

test('sends signed-out users from a protected page back to login', () => {
  renderAt('/booklist');
  expect(window.location.pathname).toBe('/');
  expect(screen.getByText(/For Booklovers!/i)).toBeInTheDocument();
});
