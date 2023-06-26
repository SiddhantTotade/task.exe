import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoAPI = createApi({
  reducerPath: "todoAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api/" }),
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: (access_token) => {
        return {
          url: "todo/",
          method: "GET",
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    createTask: builder.mutation({
      query: (data) => {
        return {
          url: "todo/",
          method: "POST",
          body: data.formData,
          headers: {
            authorization: `Bearer ${data.access_token}`,
          },
        };
      },
    }),
    UpdateTask: builder.mutation({
      query: (data) => {
        const updatedData = {
          ...data.formData,
          id: data.id,
          complete: data.complete,
        };
        return {
          url: `todo/${data.id}`,
          method: "PATCH",
          body: updatedData,
          headers: {
            authorization: `Bearer ${data.access_token}`,
          },
        };
      },
    }),
    deleteTask: builder.mutation({
      query: (data) => {
        return {
          url: `todo/${data.taskData.id}`,
          method: "DELETE",
          headers: {
            authorization: `Bearer ${data.access_token}`,
          },
        };
      },
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = todoAPI;
