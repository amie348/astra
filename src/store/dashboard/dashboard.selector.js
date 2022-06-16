import { createSelector } from 'reselect'

const dashboardReducerSelector = (state) => state.dashboard;
// export const isSideNavBarOpenSelector = (state) => (state.dashboard.isSideNavBarOpen)

export const isSideNavBarOpenSelector = createSelector(
    [dashboardReducerSelector],
    (isSideNavBarOpenSlice) => isSideNavBarOpenSlice.isSideNavBarOpen
)

export const isProfileDropDownOpenSelector = createSelector(
    [dashboardReducerSelector],
    (isProfileDropDownOpenSlice) => (
        isProfileDropDownOpenSlice.isProfileDropDownOpen
    )
)