import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../store/user/user.selectors'

import { isSideNavBarOpenSelector, isDashboardStatsLoadingSelector, dashboardStatsSelector } from '../../store/dashboard/dashboard.selector'
import { useDispatch } from 'react-redux'
import { fetchDashboardStatsStart, fetchDashboardStatsSuccess, fetchDashboardStatsFailed } from '../../store/dashboard/dashboard.action'

import ProgressBar from 'react-bootstrap/ProgressBar'
import AppsIcon from '@mui/icons-material/Apps';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Bar, Line } from 'react-chartjs-2';
import moment from 'moment'
import { Tooltip as MuiToolTip } from '@mui/material';

import axios from 'axios'
import { BASE_API_URL } from "../../assets/config"
import ErrorHandling from "../../components/errorHandler";

import Spinner from '../../components/spinner/spinner.component'

import './dashboard.styles.scss'
import ProfileAvatar from '../../assets/images/profileAvatar.png'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useState } from 'react'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Leads',
        },
    },
};

const monthsFullNames = [];

const Dashboard = () => {

    const [labels, setLabels] = useState([])
    const { accessToken } = useSelector(currentUserSelector)
    const isSideNavBarOpen = useSelector(isSideNavBarOpenSelector)
    const isDashboardStatsLoading = useSelector(isDashboardStatsLoadingSelector)
    const dashboardStats = useSelector(dashboardStatsSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDashboardStatsStart())
        axios.get(`${BASE_API_URL}/api/get/statics`, {
            headers: {
                authorization: `${accessToken}`
            },
        }
        ).then((response) => {
            let months = [];
            for (let i = 0; i < 12; i++) {
                months.push(moment().subtract(i, 'months').format('MMM'))
            }

            setLabels(months)
            // console.log(monthsFullNames)

            dispatch(fetchDashboardStatsSuccess(response.data.data))
        }).catch(error => {
            dispatch(fetchDashboardStatsFailed(error))
            ErrorHandling(error)
        })
    }, [])

    const {
        conversionRate,
        followUps,
        leadsGenerated,
        leadsClosed,
        potentialRevenue,
        totalConsultationBooked,
        totalPurchased,
        totalRevenue,
        totlaLeads } = dashboardStats

    const data = {
        labels,
        datasets: [
            {
                label: 'Leads Generated',
                data: leadsGenerated?.map((lead) => {
                    return lead.leadsGenerated
                }),
                backgroundColor: 'rgba(223, 55, 72 )',
            },
            {
                label: 'Leads Closed',
                data: leadsClosed?.map((lead) => {
                    return lead.leadsClosed
                }),
                backgroundColor: 'rgba(242, 200, 12)',
            },
        ],
    };

    return (
        <>

            <div className='layout-container'>
                <div className={`${isSideNavBarOpen ? 'layout-body-compressed' : 'layout-body'}`} >

                    <div className="layout-content">
                        {isDashboardStatsLoading ? <div className="dashboard-spinner">
                            <div className="spinner-border text-danger mt-3" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div> :
                            <>
                                <div className="row justify-content-between flex-wrap mb-4">
                                    <div className={`dashboard-item d-item-s px-4 py-4`}>
                                        <div className="row align-items-center justify-content-between">
                                            <h2 className="col-9 m-0">{`£${totalRevenue ? totalRevenue?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}`}</h2>
                                            {/* <span className="col-auto"><AppsIcon /></span> */}
                                        </div>
                                        <div className="row mt-1">
                                            <div className="col item-text">
                                                <h6>Total Revenue Generated</h6>
                                            </div>
                                        </div>
                                        {/* <div className="row">
                                            <div className="col">
                                                <ProgressBar now={40} style={{ backgroundColor: '#df374854', height: '22px' }} />
                                            </div>
                                        </div> */}
                                    </div>

                                    <div className={`dashboard-item d-item-s px-4 py-4`}>
                                        <div className="row align-items-center justify-content-between">
                                            <h2 className="col-9 m-0">{`£${potentialRevenue ? potentialRevenue?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}`}</h2>
                                            {/* <span className="col-auto"><AppsIcon /></span> */}
                                        </div>
                                        <div className="row mt-1">
                                            <div className="col item-text">
                                                <h6>Potential Revenue</h6>
                                            </div>
                                        </div>
                                        {/* <div className="row">
                                            <div className="col">
                                                <ProgressBar now={40} style={{ backgroundColor: '#df374854', height: '22px' }} />
                                            </div>
                                        </div> */}
                                    </div>


                                    <div className={`dashboard-item d-item-s px-4 py-4`}>
                                        <div className="row align-items-center justify-content-between">
                                            <h2 className="col-9 m-0">{totlaLeads ? totlaLeads : 0}</h2>
                                            {/* <span className="col-auto"><AppsIcon /></span> */}
                                        </div>
                                        <div className="row mt-1">
                                            <div className="col item-text">
                                                <h6>Total Leads Generated</h6>
                                            </div>
                                        </div>
                                        {/* <div className="row">
                                            <div className="col">
                                                <ProgressBar now={40} style={{ backgroundColor: '#df374854', height: '22px' }} />
                                            </div>
                                        </div> */}
                                    </div>

                                    <div className={`dashboard-item d-item-s px-4 py-4`}>
                                        <div className="row align-items-center justify-content-between">
                                            <h2 className="col-9 m-0">{totalPurchased ? totalPurchased : 0}</h2>
                                            {/* <span className="col-auto"><AppsIcon /></span> */}
                                        </div>
                                        <div className="row mt-1">
                                            <div className="col item-text">
                                                <h6>Leads Purchased</h6>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                {/* <ProgressBar now={(totalPurchased * 100) / totlaLeads} style={{ backgroundColor: '#df374854', height: '22px' }} /> */}
                                            </div>
                                            {/* <div className="col" style={{ textAlign: 'right', fontWeight: '800', fontSize: '9px' }}>
                                                +32% <br /> from last week
                                            </div> */}
                                        </div>
                                    </div>



                                </div>

                                <div className="row justify-content-between flex-wrap mb-4">


                                    <div className={`dashboard-item px-4 py-4 col-5 d-item-xl`}>
                                        <div className="row">
                                            <div className="col">
                                                <Bar options={options} data={data} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`dashboard-item d-item-m px-4 py-4`}>
                                        <div className="row align-items-center justify-content-between">
                                            <h2 className="col-9 m-0">{conversionRate ? conversionRate : 0}%</h2>
                                            {/* <span className="col-auto"><AppsIcon /></span> */}
                                        </div>
                                        <div className="row mt-1">
                                            <div className="col item-text">
                                                <h6>Converstion Rate </h6>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <ProgressBar now={conversionRate ? conversionRate : 0} style={{ backgroundColor: '#df374854', height: '22px' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row justify-content-between flex-wrap mb-4">



                                    <div className={`dashboard-item px-4 py-4 d-item-xl`}>
                                        <div className="row align-items-center justify-content-between mb-4">
                                            <h5 className="col-5 m-0">Leads To Follow Up</h5>
                                            <span className="col-7" style={{ fontSize: '12px' }}>{`(All the leads that need to be followed up - Show the days remaining in order)`}</span>
                                        </div>
                                        {
                                            followUps?.map(({ firstName, lastName, phone, followUpDate }) => (
                                                <div className="row lead-data justify-content-between align-items-center mb-3">
                                                    <div className="col-5">
                                                        <img src={ProfileAvatar} alt="" className='lead-img' />
                                                        <span className="lead-name">
                                                            {`${firstName} ${lastName}`}
                                                        </span>
                                                    </div>
                                                    <div className="col-3 lead-time">
                                                        <MuiToolTip title={moment(followUpDate).format(`MMMM Do YYYY, h:mm:ss a`)}>
                                                            <span>{" " + moment(followUpDate).fromNow()}</span>
                                                        </MuiToolTip>

                                                    </div>
                                                    <div className="col-3 lead-status">
                                                        {phone}
                                                    </div>
                                                    <div className="col-1 lead-actions">
                                                        <MoreVertIcon fontSize='small' />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>

                                    <div className={`dashboard-item d-item-m px-4 py-4`}>
                                        <div className="row align-items-center justify-content-between">
                                            <h2 className="col-9 m-0">{totalConsultationBooked ? totalConsultationBooked : 0}</h2>
                                            {/* <span className="col-auto"><AppsIcon /></span> */}
                                        </div>
                                        <div className="row mt-1">
                                            <div className="col item-text">
                                                <h6>Consulations Booked</h6>
                                            </div>
                                        </div>
                                        {/* <div className="row">
                                            <div className="col">
                                                <ProgressBar now={40} style={{ backgroundColor: '#df374854', height: '22px' }} />
                                            </div>
                                        </div> */}
                                    </div>

                                </div>
                            </>
                        }
                    </div>

                </div>
            </div>

        </>
    )
}

export default Dashboard