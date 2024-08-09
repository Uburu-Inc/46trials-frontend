export type LoginPayload = {
  email: string;
  password: string;
};

export interface LoginFuncProps {
  loading: boolean;
  handleLogin: (payload: LoginPayload) => Promise<void>;
}
