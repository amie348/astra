import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { dashboardReducer } from './dashboard/dashboard.reducer'

export const rootReducer = combineReducers({
    user: userReducer,
    dashboard: dashboardReducer
})