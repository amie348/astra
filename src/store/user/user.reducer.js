import { USER_ACTIONS_TYPES } from "./user.types";

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case USER_ACTIONS_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }

        default:
            return state
    }
}

const INITIAL_STATE = {
    currentUser: {
        user: {
            id: 1,
            username: "Ahmad Yaqoob",
            email: "ahmad@gmail.com",
            companyName: "Ahmad&co",
            dp: ""
        },
        accessToken: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTY5MzUxMzEsImlhdCI6MTY1NDc3NTEzMSwiaWQiOjEsInVzZXJuYW1lIjoiQWhtYWQgWWFxb29iIiwiZW1haWwiOiJhaG1hZEBnbWFpbC5jb20iLCJjb21wYW55TmFtZSI6IkFobWFkJmNvIiwiZHAiOiIifQ.kN8mFJrDMbBHo3BuW0CYCnup8PzIJ1bU9KYiditEF2U`
    }
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTQ3NDQyNjUsImlhdCI6MTY1NDcyMjY2NSwiaWQiOjEsInVzZXJuYW1lIjoiQWhtYWQgWWFxb29iIiwiZW1haWwiOiJhaG1hZEBnbWFpbC5jb20iLCJjb21wYW55TmFtZSI6IkFobWFkJmNvIiwiZHAiOiIifQ.M3MD1Tgi29DTv5snFXMGdi9OMtmmm2GD3_cd05G3dtE