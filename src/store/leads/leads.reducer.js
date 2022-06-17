import { LEADS_ACTIONS_TYPES } from "./leads.types";

export const leadsReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case LEADS_ACTIONS_TYPES.FETCH_LEADS_START:
            return {
                ...state,
                isLoading: true
            }
        case LEADS_ACTIONS_TYPES.FETCH_LEADS_SUCCESS:
            return {
                ...state,
                leadsData: payload,
                isLoading: false
            }
        case LEADS_ACTIONS_TYPES.FETCH_LEADS_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }

        default:
            return state
    }
}

const INITIAL_STATE = {
    leadsData: [],
    isLoading: false,
    error: null
}