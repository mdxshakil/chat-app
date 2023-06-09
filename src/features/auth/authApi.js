import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: '/register',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled, }) {
                try {
                    const result = await queryFulfilled;
                    console.log(result);
                    localStorage.setItem("auth", JSON.stringify({
                        accessToken: result.data.accessToken,
                        user: result.data.user,
                    }));
                    dispatch(userLoggedIn(result.data));
                } catch (error) {
                    //do nothing here
                    //handle error on ui
                }
            }
        }),
        login: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data
            })
        }),
        async onQueryStarted(data, { dispatch, queryFulfilled, }) {
            try {
                const result = await queryFulfilled;
                localStorage.setItem("auth", JSON.stringify({
                    accessToken: result.data.accessToken,
                    user: result.data.user,
                }));
                dispatch(userLoggedIn(result.data));
            } catch (error) {
                //do nothing here
                //handle error on ui
            }
        }
    })
})

export const { useRegisterMutation, useLoginMutation } = authApi;