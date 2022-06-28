import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { dashboardReducer } from './dashboard/dashboard.reducer'
import { leadsReducer } from './leads/leads.reducer'
import { usersReducer } from "./users/users.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    dashboard: dashboardReducer,
    leads: leadsReducer,
    users: usersReducer
})