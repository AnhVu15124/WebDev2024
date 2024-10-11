import API from "./api";

const AuthService = {
  login: (payload: { email: string; password: string }) => {
    return API.post("auth/login", payload);
  },
  register: (payload: {
    email: string;
    password_register: string;
    password_confirmation: string;
  }) => {
    return API.post("user", payload);
  },
  refreshToken: (payload: { token: string }) => {
    return API.post("auth/refresh-token", payload);
  },
  logout: (accessToken: string) => {
    return API.delete("auth/logiut", {
      headers: {Authorization: `Bearer ${accessToken}`},
    });
  },
  verifyEmail: (token: string) => {
    return API.put(`user/verify-email/${token}`);
  },
};

export default AuthService;