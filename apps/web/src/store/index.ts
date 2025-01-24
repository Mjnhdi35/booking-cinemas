import { configureStore, createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true
    },
    logout(state) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('userId')
      localStorage.removeItem('userName')
      localStorage.removeItem('userEmail')
      state.isLoggedIn = false
    },
  },
})
const adminSlice = createSlice({
  name: 'admin',
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true
    },
    logout(state) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('adminId')
      localStorage.removeItem('adminEmail')
      state.isLoggedIn = false
    },
  },
})

export const userActions = userSlice.actions

export const adminActions = adminSlice.actions

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    admin: adminSlice.reducer,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
