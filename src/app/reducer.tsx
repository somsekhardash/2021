import { loginActions } from "./../auth/actions";
import { Action, NotificationBanner } from "../app-types";

export type State = {
  currentPageTitle: string | null;
  showLoader: boolean;
  NotificationBanner: NotificationBanner;
  BannerErrorMessage: string;
  users: null;
};

const defaultBannerState: NotificationBanner = {
  type: "Information",
  message: "",
  show: false,
};

export const defaultState: State = {
  currentPageTitle: null,
  showLoader: false,
  NotificationBanner: { ...defaultBannerState },
  BannerErrorMessage: "",
  users: null,
};

const reducer = (
  state: State = defaultState,
  { type, payload }: Action
): State => {
  switch (type) {
    case loginActions.requesting().type:
      return {
        ...state,
        showLoader: true,
        NotificationBanner: { ...defaultBannerState },
      };
    case loginActions.success({}).type:
      return {
        ...state,
        showLoader: false,
      };
    case loginActions.failure({}).type:
      return {
        ...state,
        showLoader: false,
        NotificationBanner: {
          ...state.NotificationBanner,
          type: "Error",
          message: payload,
          show: true,
        },
      };
    default:
      return state;
  }
};

export default reducer;
