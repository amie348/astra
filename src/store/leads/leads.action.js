import { LEADS_ACTIONS_TYPES } from "./leads.types"

export const setLeadsData = (leadsData) => ({ type: LEADS_ACTIONS_TYPES.SET_LEADS, payload: leadsData })