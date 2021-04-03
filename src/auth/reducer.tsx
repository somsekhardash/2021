import { Action, User } from "./../app-types";
import { loginActions, resetStore, signupActions } from "./actions";
import { logoutActions } from "./actions";

export type AuthData = {
  user: User;
  tokens: {
    accessToken: string;
  };
};

export type State = {
  data: any | null;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  isLoggedIn: boolean;
  isForcedLogout: boolean;
  isRedirectHome: boolean;
  isLoginError: string;
  isAdmin: boolean;
  isLoading: boolean;
};

export const defaultState: State = {
  data: null,
  isLoggingIn: false,
  isLoggingOut: false,
  isLoggedIn: false,
  isForcedLogout: false,
  isRedirectHome: false,
  isLoginError: "",
  isAdmin: false,
  isLoading: false,
};

const reducer = (
  state: State = defaultState,
  { type, payload }: Action
): State => {
  switch (type) {
    case signupActions.requesting().type:
      return {
        ...state,
        isLoggingIn: true,
        isLoginError: "",
        isLoading: true,
      };
    case loginActions.requesting().type:
      return {
        ...state,
        isLoggingIn: true,
        isLoginError: "",
        isLoading: true,
      };
    case loginActions.success({}).type:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        isLoginError: "",
        data: { ...payload },
        isLoading: false,
        isAdmin: payload.mobileNumber == process.env.ADMIN_ID,
      };
    case signupActions.success({}).type:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        isLoginError: "",
        data: { ...payload },
        isLoading: false,
        isAdmin: payload.mobileNumber == process.env.ADMIN_ID,
      };
    case loginActions.failure({}).type:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        isLoginError: payload.message,
        isLoading: false,
      };
    case signupActions.failure({}).type:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        isLoginError: payload.message,
        isLoading: false,
      };
    case logoutActions.success({}).type:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        isLoginError: "",
        isLoading: false,
        data: null,
      };
    case resetStore().type:
      return {
        ...defaultState,
      };
    default:
      return state;
  }
};

export default reducer;
