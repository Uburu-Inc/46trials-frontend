export const routes = {
  LOGIN: "/auth/token/",
  VERIFY: "/one-record/",
  FETCH_INSTITUTIONS: "/institutions/",
  SET_INSTITUTION: (id: string) => `/one-record/${id}/`,
  FETCH_RESPONSE: (id: string) => `/one-record/${id}/requesting-institution-records/`,
  FETCH_SERVICE_CATALOG: (id: string) => `/institution-service-catalog/?institution=${id}`,
  CONSENT: (id: string) => `/one-record/${id}/`,
  REGISTER_PAYMENT: (id: string) => `/one-record/${id}/`,
  REGISTER_WALLET_DEPOSIT_HISTORY: '/wallet-deposit-history/',
  REGISTER_WITHDRAWAL_REQUEST: '/withdrawal-request/',
  CREATE_REFERRAL: '/one-record/referrals/'
};
