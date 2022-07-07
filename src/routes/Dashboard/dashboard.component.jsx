import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { currentUserSelector } from '../../store/user/user.selectors'
import { isSideNavBarOpenSelector } from '../../store/dashboard/dashboard.selector'

import ProgressBar from 'react-bootstrap/ProgressBar'
import AppsIcon from '@mui/icons-material/Apps';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Bar } from 'react-chartjs-2';

import { Navigate, Route, Routes } from 'react-router-dom'

import SideNavBar from '../../components/side-nav-bar/side-nav-bar.component'

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

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
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

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Leads Generated',
            data: labels.map(() => Math.floor(Math.random() * 1001)),
            backgroundColor: '#dc3545',
        },
        {
            label: 'Leads Closed',
            data: labels.map(() => Math.floor(Math.random() * 1001)),
            backgroundColor: '#df374854',
        },
    ],
};

const Dashboard = () => {
    const { accessToken } = useSelector(currentUserSelector)
    const isSideNavBarOpen = useSelector(isSideNavBarOpenSelector)

    return (
        <div className='layout-container'>
            <div className={`${isSideNavBarOpen ? 'layout-body layout-body-compressed' : 'layout-body'}`} >
                <div className="layout-content">

                    <div className="row justify-content-between flex-wrap mb-4">
                        <div className={`dashboard-item d-item-s px-4 py-4`}>
                            <div className="row align-items-center justify-content-between">
                                <h2 className="col-9 m-0">$50,604</h2>
                                <span className="col-auto"><AppsIcon /></span>
                            </div>
                            <div className="row mt-1">
                                <div className="col item-text">{`Total Revenue Generated (Add up revenue column)`}</div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <ProgressBar now={40} style={{ backgroundColor: '#df374854', height: '22px' }} />
                                </div>
                            </div>
                        </div>

                        <div className={`dashboard-item d-item-s px-4 py-4`}>
                            <div className="row align-items-center justify-content-between">
                                <h2 className="col-9 m-0">$220,000</h2>
                                <span className="col-auto"><AppsIcon /></span>
                            </div>
                            <div className="row mt-1">
                                <div className="col item-text">Potential Revenue. <br />
                                    Average Purcahse Revenue x (number of leads(expect deed leads = Purchase)) <span style={{ fontWeight: '800', color: 'black', marginLeft: '30px' }}>40%</span></div>

                            </div>
                            <div className="row">
                                <div className="col">
                                    <ProgressBar now={40} style={{ backgroundColor: '#df374854', height: '22px' }} />
                                </div>
                            </div>
                        </div>

                        <div className={`dashboard-item d-item-s px-4 py-4`}>
                            <div className="row align-items-center justify-content-between">
                                <h2 className="col-9 m-0">55%</h2>
                                <span className="col-auto"><AppsIcon /></span>
                            </div>
                            <div className="row mt-1">
                                <div className="col item-text">CONVERSION RATE % (Leads purchased/Total number of leads</div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <ProgressBar now={40} style={{ backgroundColor: '#df374854', height: '22px' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-between flex-wrap mb-4">

                        <div className={`dashboard-item d-item-s px-4 py-4`}>
                            <div className="row align-items-center justify-content-between">
                                <h2 className="col-9 m-0">284</h2>
                                <span className="col-auto"><AppsIcon /></span>
                            </div>
                            <div className="row mt-1">
                                <div className="col item-text">{`Total Leads Generated`}</div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <ProgressBar now={40} style={{ backgroundColor: '#df374854', height: '22px' }} />
                                </div>
                            </div>
                        </div>

                        <div className={`dashboard-item d-item-s px-4 py-4`}>
                            <div className="row align-items-center justify-content-between">
                                <h2 className="col-9 m-0">33</h2>
                                <span className="col-auto"><AppsIcon /></span>
                            </div>
                            <div className="row mt-1">
                                <div className="col item-text">{`Consulations Booked`}</div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <ProgressBar now={40} style={{ backgroundColor: '#df374854', height: '22px' }} />
                                </div>
                            </div>
                        </div>

                        <div className={`dashboard-item d-item-s px-4 py-4`}>
                            <div className="row align-items-center justify-content-between">
                                <h2 className="col-9 m-0">55</h2>
                                <span className="col-auto"><AppsIcon /></span>
                            </div>
                            <div className="row mt-1">
                                <div className="col item-text">{`Leads Purchased`}</div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <ProgressBar now={40} style={{ backgroundColor: '#df374854', height: '22px' }} />
                                </div>
                                <div className="col" style={{ textAlign: 'right', fontWeight: '800', fontSize: '9px' }}>
                                    +32% <br /> from last week
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-between flex-wrap mb-4">

                        <div className={`dashboard-item px-4 py-4 col-5 d-item-l`}>
                            <div className="row">
                                <div className="col">
                                    <Bar options={options} data={data} />
                                </div>
                            </div>
                        </div>

                        <div className={`dashboard-item px-4 py-4 d-item-xl`}>
                            <div className="row align-items-center justify-content-between mb-4">
                                <h5 className="col-5 m-0">Leads To Follow Up</h5>
                                <span className="col-7" style={{ fontSize: '12px' }}>(All the leads that need to be followed up - Show the days remaining in order)</span>
                            </div>
                            <div className="row lead-data justify-content-between align-items-center">
                                <div className="col-auto">
                                    <img src={ProfileAvatar} alt="" className='lead-img' />
                                    <span className="lead-name">
                                        James Smith
                                    </span>
                                </div>
                                <div className="col-auto lead-time">
                                    3 days
                                </div>
                                <div className="col-auto lead-status">
                                    Overdue
                                </div>
                                <div className="col-auto lead-actions">
                                    <MoreVertIcon fontSize='small' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dashboard