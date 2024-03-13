import { apiSlice } from "../root_api/apiSlice";

const fileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD THUMBNAIL
    addThumbnail: builder.mutation({
      query: (data) => ({
        url: "/file/upload",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["file"],
    }),
  }),
});

export const { useAddThumbnailMutation } = fileApi;
