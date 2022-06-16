import { createSelector } from 'reselect'


const userReducerSelector = (state) => state.user;
// export const currentUserSelector = (state) => (state.user.currentUser)

export const currentUserSelector = createSelector(
    [userReducerSelector],
    (currentUserSlice) => currentUserSlice.currentUser
)