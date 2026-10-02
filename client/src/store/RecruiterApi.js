import { baseApi } from "./BaseApi";

const recruiterApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        addJob: builder.mutation({
            query:(jobData) => ({
                url: "/recruiter/addjob",
                method: "POST",
                body: jobData
            }),
            invalidatesTags: ["Jobs"]
        }),

        getApplications: builder.query({
            query:() => "/recruiter/getapplications",
            providesTags: ["Applications"]
        }),

        getInterviewsRec: builder.query({
            query: () => "/recruiter/getinterviews",
            providesTags: ["InterviewsRecruiter"]
        }),

        scheduleInterview: builder.mutation({
            query: ({applicationId, data}) => ({
                url: "/recruiter/scheduleinterview",
                method: "POST",
                body: {applicationId, data}
            }),
            invalidatesTags: ["Applications", "Interviews"]
        })
    })
});

export const    {useAddJobMutation,
                useGetApplicationsQuery, 
                useGetInterviewsRecQuery, 
                useScheduleInterviewMutation} = recruiterApi;