export const routes = {
  FETCH_PROFILE: (id: string) => `/businesses/${id}`,
  UPDATE_PROFILE: '/auth/password/change/',
  TRIALS: '/trials/',
  TRIAL: (id: number) => `/trials/${id}`,
  FETCH_EXCHANGE_RATE: 'https://v6.exchangerate-api.com/v6/f731d31b5c3a50b7443e5235/pair/USD/NGN'
};
