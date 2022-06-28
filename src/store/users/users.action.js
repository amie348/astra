import { USERS_ACTIONS_TYPES } from "./users.types"

export const setUsersPageNumber = (pageNumber) => ({ type: USERS_ACTIONS_TYPES.SET_USERS_PAGE_NUMBER, payload: pageNumber })
export const setUsersOffset = (offset) => ({ type: USERS_ACTIONS_TYPES.SET_USERS_OFFSET, payload: offset })
export const setUsersRawData = (usersRawData) => ({ type: USERS_ACTIONS_TYPES.SET_USERS_RAW_DATA, payload: usersRawData })

export const fetchUsersStart = () => ({ type: USERS_ACTIONS_TYPES.FETCH_USERS_START, payload: null })
export const fetchUsersSuccess = (usersData) => ({ type: USERS_ACTIONS_TYPES.FETCH_USERS_SUCCESS, payload: usersData })
export const fetchUsersFailed = (error) => ({ type: USERS_ACTIONS_TYPES.FETCH_USERS_FAILED, payload: error })

export const setUsersClickedRow = (clickedRow) => ({ type: USERS_ACTIONS_TYPES.SET_USERS_CLICKED_ROW, payload: clickedRow })

export const setUsersSearchFilters = (searchFilters) => ({ type: USERS_ACTIONS_TYPES.SET_USERS_SEARCH_FILTERS, payload: searchFilters })
export const setUsersIsLoading = (isLoading) => ({ type: USERS_ACTIONS_TYPES.SET_USERS_IS_LOADING, payload: isLoading })

