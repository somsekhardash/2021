import { publicRequest } from "Src/utils/network";
import { ActionsCreator, networkActionsCreator } from "Src/utils/creators";
import { cookieManager } from "Src/utils/cookieManager";
export const signupActions = networkActionsCreator("SIGN-UP");
export const loginActions = networkActionsCreator("LOG-IN");
export const logoutActions = networkActionsCreator("LOG-OUT");
export const resetStore = ActionsCreator("RESET-STORE");

export type SignupRequestBody = {
  userName: string;
  mobileNumber: string;
};

export type LoginRequestBody = {
  mobileNumber: string;
  password: string;
};

export type LogoutRequestBody = {
  authToken: string;
  mobileNumber: string;
};

export const basicSignup = (body: SignupRequestBody): any => async (
  dispatch: any
) => signupRequest(body, "create-user", dispatch);

export const basicLogin = (body: LoginRequestBody): any => async (
  dispatch: any
) => loginRequest(body, "login-user", dispatch);

export const basicLogout = (body: LogoutRequestBody): any => async (
  dispatch: any
) => logoutRequest(body, "logout-user", dispatch);

const signupRequest = async (
  body: SignupRequestBody,
  endpoint: string,
  dispatch: any
) => {
  try {
    dispatch(signupActions.requesting());
    const response = await publicRequest({
      url: endpoint,
      method: "POST",
      data: body,
    });
    dispatch(signupActions.success(response));
  } catch (e) {
    dispatch(signupActions.failure(e));
  }
};

const loginRequest = async (
  body: LoginRequestBody,
  endpoint: string,
  dispatch: any
) => {
  try {
    dispatch(loginActions.requesting());
    const response = await publicRequest({
      url: endpoint,
      method: "POST",
      data: body,
    });
    const { status, data } = response.data;
    if (status) {
      const responseData = { ...data };
      await setUserCookie(responseData);
      dispatch(loginActions.success(responseData));
    } else {
      dispatch(loginActions.failure(response.data));
    }
  } catch (e) {
    dispatch(loginActions.failure(e));
  }
};

const logoutRequest = async (
  body: LogoutRequestBody,
  endpoint: string,
  dispatch: any
) => {
  try {
    dispatch(logoutActions.requesting());
    cookieManager.remove("user-data", { path: "/" });
    const response = await publicRequest({
      url: endpoint,
      method: "POST",
      data: body,
    });
    dispatch(logoutActions.success(response));
    dispatch(resetStore());
  } catch (e) {
    dispatch(logoutActions.failure(e));
  }
};

export const setUserCookie = (data: any) => {
  const expiryInSec = 1 * 24 * 60 * 60; // 1 day
  return new Promise((resolve, reject) => {
    resolve(
      cookieManager.set("user-data", data, {
        maxAge: expiryInSec,
        sameSite: "strict",
        path: "/",
      })
    );
  });
};
