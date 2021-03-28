import React from "react";
import { User } from "../app-types";
import { UserCard } from "./user";
import "./users.scss";

export const Users = ({ users }: any) => {
  return (
    <div className="users">
      {users.map((user: User, index: number) => (
        <UserCard key={index} user={user} />
      ))}
    </div>
  );
};
