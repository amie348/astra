import { DASHBOARD_ACTIONS_TYPES } from "./dashboard.types";

export const dashboardReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case DASHBOARD_ACTIONS_TYPES.SET_IS_SIDE_NAV_BAR_OPEN:
            return {
                ...state,
                isSideNavBarOpen: payload
            }

        case DASHBOARD_ACTIONS_TYPES.SET_IS_PROFILE_DROP_DOWN_OPEN:
            return {
                ...state,
                isProfileDropDownOpen: payload
            }

        case DASHBOARD_ACTIONS_TYPES.FETCH_DASHBOARD_STATS_START:
            return {
                ...state,
                isDashboardStatsLoading: true
            }
        case DASHBOARD_ACTIONS_TYPES.FETCH_DASHBOARD_STATS_SUCCESS:
            return {
                ...state,
                dashboardStats: payload,
                isDashboardStatsLoading: false
            }
        case DASHBOARD_ACTIONS_TYPES.FETCH_DASHBOARD_STATS_FAILED:
            return {
                ...state,
                isDashboardStatsLoading: false,
                error: payload
            }

        default:
            return state
    }
}

const INITIAL_STATE = {
    isSideNavBarOpen: true,
    isProfileDropDownOpen: false,
    dashboardStats: {},
    isDashboardStatsLoading: false
}