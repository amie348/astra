import { LEADS_ACTIONS_TYPES } from "./leads.types"
import axios from "axios"
import { useSelector } from "react-redux"
import { currentUserSelector } from "../user/user.selectors"

export const setLeadsPageNumber = (pageNumber) => ({ type: LEADS_ACTIONS_TYPES.SET_LEADS_PAGE_NUMBER, payload: pageNumber })

export const setLeadsOffset = (offset) => ({ type: LEADS_ACTIONS_TYPES.SET_LEADS_OFFSET, payload: offset })

export const fetchLeadsStart = () => ({ type: LEADS_ACTIONS_TYPES.FETCH_LEADS_START, payload: null })

export const fetchLeadsSuccess = (leadsData) => ({ type: LEADS_ACTIONS_TYPES.FETCH_LEADS_SUCCESS, payload: leadsData })
export const setLeadsRawData = (leadsRawData) => ({ type: LEADS_ACTIONS_TYPES.SET_LEADS_RAW_DATA, payload: leadsRawData })

export const fetchLeadsFailed = (error) => ({ type: LEADS_ACTIONS_TYPES.FETCH_LEADS_FAILED, payload: error })

export const setClickedRow = (clickedRow) => ({ type: LEADS_ACTIONS_TYPES.SET_CLICKED_ROW, payload: clickedRow })

export const setShowEditModal = (showEditModal) => ({ type: LEADS_ACTIONS_TYPES.SET_SHOW_EDIT_MODAL, payload: showEditModal })

export const setShowConfirmUpdateModal = (showConfirmUpdateModal) => ({ type: LEADS_ACTIONS_TYPES.SET_SHOW_CONFIRM_UPDATE_MODAL, payload: showConfirmUpdateModal })