import { USER_ACTIONS_TYPES } from "./user.types";

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case USER_ACTIONS_TYPES.SET_CURRENT_USER:
            const { user, accessToken } = payload
            return {
                currentUser: { user, accessToken: `${accessToken ? `bearer `.concat(accessToken) : ''}` }
            }

        default:
            return state
    }
}

const INITIAL_STATE = {
    currentUser: {
        user: {},
        accessToken: ''
    }
}