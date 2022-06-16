import { LEADS_ACTIONS_TYPES } from "./leads.types";

export const leadsReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case LEADS_ACTIONS_TYPES.SET_LEADS:
            return {
                leadsData: payload
            }

        default:
            return state
    }
}

const INITIAL_STATE = {
    leadsData: []
}