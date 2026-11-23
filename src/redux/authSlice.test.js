import reducer, { loginSuccess, loginFailure, logout } from './authSlice';

const signedOut = {
  token: null,
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

beforeEach(() => localStorage.clear());

test('loginSuccess stores the token and marks the user signed in', () => {
  const state = reducer(signedOut, loginSuccess({ token: 'abc', user: { name: 'Test' } }));
  expect(state.isAuthenticated).toBe(true);
  expect(state.token).toBe('abc');
  expect(localStorage.getItem('token')).toBe('abc');
});

test('loginFailure keeps the user signed out and records the error', () => {
  const state = reducer({ ...signedOut, loading: true }, loginFailure('Invalid credentials'));
  expect(state.isAuthenticated).toBe(false);
  expect(state.loading).toBe(false);
  expect(state.error).toBe('Invalid credentials');
});

test('logout clears the token', () => {
  localStorage.setItem('token', 'abc');
  const state = reducer({ ...signedOut, token: 'abc', isAuthenticated: true }, logout());
  expect(state.isAuthenticated).toBe(false);
  expect(state.token).toBeNull();
  expect(localStorage.getItem('token')).toBeNull();
});
