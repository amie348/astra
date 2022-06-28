import { USERS_ACTIONS_TYPES } from "./users.types";

export const usersReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case USERS_ACTIONS_TYPES.FETCH_USERS_START:
            return {
                ...state,
                isUsersLoading: true
            }
        case USERS_ACTIONS_TYPES.FETCH_USERS_SUCCESS:
            return {
                ...state,
                usersData: payload,
                isUsersLoading: false
            }
        case USERS_ACTIONS_TYPES.FETCH_USERS_FAILED:
            return {
                ...state,
                isUsersLoading: false,
                error: payload
            }

        case USERS_ACTIONS_TYPES.SET_USERS_PAGE_NUMBER:
            return {
                ...state,
                usersPageNumber: payload
            }

        case USERS_ACTIONS_TYPES.SET_USERS_OFFSET:
            return {
                ...state,
                usersOffset: payload
            }

        case USERS_ACTIONS_TYPES.SET_USERS_CLICKED_ROW: {
            return {
                ...state,
                usersClickedRow: payload
            }
        }

        case USERS_ACTIONS_TYPES.SET_USERS_RAW_DATA:
            return {
                ...state,
                usersRawData: payload
            }

        case USERS_ACTIONS_TYPES.SET_USERS_SEARCH_FILTERS:
            return {
                ...state,
                usersSearchFilters: payload
            }

        case USERS_ACTIONS_TYPES.SET_USERS_IS_LOADING:
            return {
                ...state,
                isUsersLoading: payload
            }

        default:
            return state
    }
}

const INITIAL_STATE = {
    usersRawData: {},
    usersData: [],
    isUsersLoading: false,
    usersPageNumber: 1,
    usersOffset: 10,
    usersClickedRow: {},
    usersSearchFilters: {}
}