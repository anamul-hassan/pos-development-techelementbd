import { CLIENT_DETAILS } from "@/utils/constants/client_information/client_details";
import { shareWithCookies } from "@/utils/helpers/shareWithCookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = CLIENT_DETAILS.baseUrl;
const customBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders(headers) {
    headers.set(
      "Authorization",
      `Bearer ${shareWithCookies("get", `${CLIENT_DETAILS.companyCode}token`)}`
    );
    return headers;
  },
});
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: customBaseQuery,
  endpoints: () => ({}),
  tagTypes: [
    "user",
    "branch",
    "invest",
    "investing",
    "expense-category",
    "expense-sub-category",
    "account",
    "product-category",
    "product-sub-category",
    "unit",
    "brand",
    "pos",
    "sell",
    "product",
    "expense",
    "purchase",
    "warranty",
    "dashboard",
    "customer",
    "supplier",
    "variation",
    "file",
  ],
});
