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

        case LEADS_ACTIONS_TYPES.SET_LEADS_PAGE_NUMBER:
            return {
                ...state,
                pageNumber: payload
            }

        case LEADS_ACTIONS_TYPES.SET_LEADS_OFFSET:
            return {
                ...state,
                offset: payload
            }

        case LEADS_ACTIONS_TYPES.SET_CLICKED_ROW: {
            console.log(`-----------------------------clicked row` , payload)
        
            return {
                ...state,
                clickedRow: payload
            }
        }

        case LEADS_ACTIONS_TYPES.SET_SHOW_EDIT_MODAL:
            return {
                ...state,
                showEditModal: payload
            }

        case LEADS_ACTIONS_TYPES.SET_SHOW_CONFIRM_UPDATE_MODAL:
            return {
                ...state,
                showConfirmUpdateModal: payload
            }

        case LEADS_ACTIONS_TYPES.SET_LEADS_RAW_DATA:
            return {
                ...state,
                leadsRawData: payload
            }

        case LEADS_ACTIONS_TYPES.SET_LEADS_DELETE_ERROR:
            return {
                ...state,
                deleteError: payload
            }

        case LEADS_ACTIONS_TYPES.SET_LEADS_UPDATE_ERROR:
            return {
                ...state,
                updateError: payload
            }

        case LEADS_ACTIONS_TYPES.SET_LEADS_SUCCESSFULLY_DELETED:
            return {
                ...state,
                successfullyDeleted: payload
            }

        case LEADS_ACTIONS_TYPES.SET_LEADS_SUCCESSFULLY_UPDATED:
            return {
                ...state,
                successfullyUpdated: payload
            }

        case LEADS_ACTIONS_TYPES.SET_SEARCH_FILTERS:
            return {
                ...state,
                searchFilters: payload
            }

        case LEADS_ACTIONS_TYPES.SET_IS_LOADING:
            return {
                ...state,
                isLoading: payload
            }

        default:
            return state
    }
}

const INITIAL_STATE = {
    leadsRawData: {},
    leadsData: [],
    isLoading: false,
    updateError: false,
    deleteError: false,
    pageNumber: 1,
    offset: 10,
    clickedRow: {},
    showEditModal: false,
    showConfirmUpdateModal: false,
    successfullyUpdated: false,
    successfullyDeleted: false,
    searchFilters: {}
}