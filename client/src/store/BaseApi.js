import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: "include"
    }),
    tagTypes: ["Jobs", "Applications", "InterviewsRecruiter", "InternalJobs", "ExternalJobs", "AppliedJobs", "InterviewsCandidate"],
  endpoints: () => ({}),
});

export {baseApi};