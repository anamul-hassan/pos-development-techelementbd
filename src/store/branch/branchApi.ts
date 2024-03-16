import { apiSlice } from "../root_api/apiSlice";

export const undefinedSize = 1000000000000;

const branchApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ADD BRANCH
    addBranch: builder.mutation({
      query: (data) => ({
        url: "/branch/create-branch/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["branch"],
    }),
    // GET BRANCHES
    getBranches: builder.query({
      query: (data) => ({
        url: `/branch/get-branch-all?search=${data?.search || ""}&page=${
          data?.page || 1
        }&size=${data?.size || undefinedSize}&sortOrder=${
          data?.sortOrder || "asc"
        }`,
      }),
      providesTags: ["branch"],
    }),
    // GET SINGLE BRANCH
    getSingleBranch: builder.query({
      query: (id) => ({
        url: `/branch/get-branch-by-id/${id}`,
      }),
      providesTags: ["branch"],
    }),
    // UPDATE BRANCH
    updateBranch: builder.mutation({
      query: ({ id, data }) => ({
        url: `/branch/update-branch/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["branch"],
    }),
    // DELETE BRANCH
    deleteBranch: builder.mutation({
      query: (id) => ({
        url: `/branch/delete-branch/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["branch"],
    }),
  }),
});

export const {
  useAddBranchMutation,
  useGetBranchesQuery,
  useGetSingleBranchQuery,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
} = branchApi;
