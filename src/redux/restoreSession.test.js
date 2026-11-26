import { configureStore } from '@reduxjs/toolkit';

// The auth slice reads localStorage when it is first imported, so each test
// sets the token first and then loads fresh copies of the modules.
function setup(token) {
  jest.resetModules();
  localStorage.clear();
  sessionStorage.clear();
  if (token) localStorage.setItem('token', token);
  const authReducer = require('./authSlice').default;
  const { restoreSession } = require('./authThunks');
  const store = configureStore({ reducer: { auth: authReducer } });
  return { store, restoreSession };
}

afterEach(() => {
  delete global.fetch;
});

test('without a saved token the user starts logged out and the check is done', () => {
  const { store } = setup(null);
  expect(store.getState().auth.isAuthenticated).toBe(false);
  expect(store.getState().auth.authChecked).toBe(true);
});

test('a valid saved token keeps the user logged in after a refresh', async () => {
  const { store, restoreSession } = setup('good-token');
  expect(store.getState().auth.isAuthenticated).toBe(true);
  expect(store.getState().auth.authChecked).toBe(false);

  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({ _id: 'u1', name: 'Test Reader', email: 't@example.test', date: '2026-11-26' }),
  });
  await store.dispatch(restoreSession());

  const auth = store.getState().auth;
  expect(auth.isAuthenticated).toBe(true);
  expect(auth.authChecked).toBe(true);
  expect(auth.user.name).toBe('Test Reader');
  expect(sessionStorage.getItem('userId')).toBe('u1');
  expect(global.fetch.mock.calls[0][1].headers['auth-token']).toBe('good-token');
});

test('a token the backend rejects logs the user out', async () => {
  const { store, restoreSession } = setup('expired-token');
  global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 401, json: async () => ({ error: 'bad token' }) });
  await store.dispatch(restoreSession());

  const auth = store.getState().auth;
  expect(auth.isAuthenticated).toBe(false);
  expect(auth.authChecked).toBe(true);
  expect(localStorage.getItem('token')).toBeNull();
});

test('a network error (backend waking up) keeps the user logged in', async () => {
  const { store, restoreSession } = setup('good-token');
  global.fetch = jest.fn().mockRejectedValue(new Error('network down'));
  await store.dispatch(restoreSession());

  const auth = store.getState().auth;
  expect(auth.isAuthenticated).toBe(true);
  expect(auth.authChecked).toBe(true);
  expect(localStorage.getItem('token')).toBe('good-token');
});
