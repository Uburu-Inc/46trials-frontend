export const routes = {
  FETCH_PROFILE: (id: string) => `/businesses/${id}`,
  FETCH_DATA_DICTIONARY: "/data-dictionary",
  UPDATE_PROFILE: "/auth/password/change/",
  TRIALS: "/trials/",
  UPLOAD_TRIAL_FILES: "/trial-files/",
  TRIAL: (id: number) => `/trials/${id}`,
  FETCH_EXCHANGE_RATE:
    "https://v6.exchangerate-api.com/v6/f731d31b5c3a50b7443e5235/pair/USD/NGN",
  RUN_SQL_QUERY: "/query/run/",
};
