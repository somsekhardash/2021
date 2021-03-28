declare interface Action<T = any> {
  readonly type: string;
  readonly payload?: T;
}

declare type Dispatch<T = any> = (_: Action<T>) => void;

declare global {
  interface Window {
    __PRELOADED_STATE__: any;
  }
}

export type Role = {
  _id: string;
  code: string;
};

export type User = {
  _id: string;
  userName: string;
  mobileNumber: string;
};

export type Message = {
  text: string;
  type: "success" | "warning" | "error" | "info";
};

export interface Match {
  _id: string;
  tournamentId: { type: String; required: true };
  team1: { type: String; required: true };
  team2: { type: String; required: true };
  time: { type: String; required: true };
  venue: { type: String };
  winner: { type: String };
  isStarted: { type: Boolean };
  team1Squard: [User];
  team2Squard: [User];
}

export interface Tournament {
  title: { type: String; required: true };
  matches: [Match | null];
  users: [User];
  _id: string;
}

export interface NotificationBanner {
  type: "Success" | "Error" | "Information";
  message: "";
  show: boolean;
}
