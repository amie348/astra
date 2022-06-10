import { DASHBOARD_ACTIONS_TYPES } from "./dashboard.types";

export const dashboardReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action

    switch (type) {
        case DASHBOARD_ACTIONS_TYPES.SET_IS_SIDE_NAV_BAR_OPEN:
            return {
                ...state,
                isSideNavBarOpen: payload
            }

        default:
            return state
    }
}

const INITIAL_STATE = {
    isSideNavBarOpen: true,
}