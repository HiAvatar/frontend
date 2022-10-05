import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Avatar } from 'index'

const url = import.meta.env.VITE_SERVICE_URL
const accessToken = import.meta.env.VITE_TOKEN

export const avatarApi = createApi({
  reducerPath: 'avatarApi',
  baseQuery: fetchBaseQuery({
    baseUrl: url,
    prepareHeaders: (headers) => {
      const accessTokenCookies = accessToken
      if (accessTokenCookies) {
        headers.set('Authorization', `Bearer ${accessTokenCookies}`)
      }
      return headers
    }
  }),
  endpoints: (builder) => ({
    getAvatar: builder.query({
      query: (id) => ({
        url: `projects/${id}/avatar`,
        method: 'GET'
      }),
      transformResponse: (responseData: Avatar) => {
        return responseData['data']
      }
    })
  })
})

export const { useGetAvatarQuery } = avatarApi
