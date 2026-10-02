import {baseApi} from "./BaseApi.js";
const candidateApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getInternalJobs: builder.query({
            query: () => "/candidate/getinjobs",
            providesTags: ["InternalJobs"]
        }),

        getExternalJobs: builder.query({
            query: () => "/candidate/getexjobs",
            providesTags: ["ExternalJobs"]
        }),

        getAppliedJobs: builder.query({
            query: () => "/candidate/getappliedjobs",
            providesTags: ["AppliedJobs"]
        }),

        getInterviewsCan: builder.query({
            query: () => "/candidate/getinterviews",
            providesTags: ["InterviewsCandidate"]
        }),

        applyJob: builder.mutation({
            query: (jobId) => {
                return {
                    url: "/candidate/applyjob",
                    method: "POST",
                    body: {jobId}
                };
            },
            invalidatesTags: ["AppliedJobs", "InternalJobs"]
        }),
        joinInterview: builder.mutation({
            query: (interviewId) => ({
                url: "/interview/join",
                method: "POST",
                body: { interviewId }
            }) 
        })
    })
});

export const {useGetInternalJobsQuery,
        useGetExternalJobsQuery,
        useGetAppliedJobsQuery,
        useGetInterviewsCanQuery,
        useApplyJobMutation,
        useJoinInterviewMutation
        } = candidateApi;

