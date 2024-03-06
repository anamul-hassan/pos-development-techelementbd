import { CLIENT_DETAILS } from "../constants/client_information/client_details";
import { capitalizeEveryWord } from "./capitalizeEveryWord";
import { shareWithCookies } from "./shareWithCookies";
import { jwtDecode } from "jwt-decode";
export const shareBranchAndUserInfo = () => {
  const token = shareWithCookies(
    "get",
    `${CLIENT_DETAILS.companyCode}token`
  ) as any;

  const branchInfo = jwtDecode(token || "") as any;

  return {
    branchId: branchInfo.branch,
    name: capitalizeEveryWord(branchInfo.name),
    email: branchInfo.email,
    role: branchInfo.role,
  };
};
