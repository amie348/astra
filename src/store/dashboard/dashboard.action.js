import { DASHBOARD_ACTIONS_TYPES } from "./dashboard.types"

export const setIsSideNavBarOpen = (bool) => ({ type: DASHBOARD_ACTIONS_TYPES.SET_IS_SIDE_NAV_BAR_OPEN, payload: bool })
export const setIsProfileDropDownOpen = (bool) => ({ type: DASHBOARD_ACTIONS_TYPES.SET_IS_PROFILE_DROP_DOWN_OPEN, payload: bool })

export const fetchDashboardStatsStart = () => ({ type: DASHBOARD_ACTIONS_TYPES.FETCH_DASHBOARD_STATS_START, payload: null })
export const fetchDashboardStatsSuccess = (dashboardStats) => ({ type: DASHBOARD_ACTIONS_TYPES.FETCH_DASHBOARD_STATS_SUCCESS, payload: dashboardStats })
export const fetchDashboardStatsFailed = (error) => ({ type: DASHBOARD_ACTIONS_TYPES.FETCH_DASHBOARD_STATS_FAILED, payload: error })