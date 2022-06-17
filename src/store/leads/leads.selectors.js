import { createSelector } from 'reselect'

// const leadsReducerSelector = (state) => state.leads;

// export const leadsSelector = createSelector(
//     [leadsReducerSelector],
//     (leadsSlice) => leadsSlice.leadsData
// )

export const leadsSelector = (state) => state.leads