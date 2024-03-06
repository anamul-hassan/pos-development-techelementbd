import { shareBranchAndUserInfo } from "./shareBranchAndUserInfo";

export const actionManager = (roles: string[]) => {
  const { role } = shareBranchAndUserInfo();
  return roles
    ?.map((role: string) => role.toLowerCase())
    .includes(role.toLowerCase());
};
