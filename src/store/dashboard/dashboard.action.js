import { DASHBOARD_ACTIONS_TYPES } from "./dashboard.types"

export const setIsSideNavBarOpen = (bool) => ({ type: DASHBOARD_ACTIONS_TYPES.SET_IS_SIDE_NAV_BAR_OPEN, payload: bool })
export const setIsProfileDropDownOpen = (bool) => ({ type: DASHBOARD_ACTIONS_TYPES.SET_IS_PROFILE_DROP_DOWN_OPEN, payload: bool })