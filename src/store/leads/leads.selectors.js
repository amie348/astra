import { createSelector } from 'reselect'

const leadsReducerSelector = (state) => state.leads;

export const leadsSelector = createSelector(
    [leadsReducerSelector],
    (leadsSlice) => leadsSlice.leadsData
)