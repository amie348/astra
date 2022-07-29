import { useSelector } from "react-redux"
import { isSideNavBarOpenSelector } from "../../store/dashboard/dashboard.selector"
import { currentUserSelector } from '../../store/user/user.selectors';

const Notes = () => {
    
    const isSideNavBarOpen = useSelector(isSideNavBarOpenSelector)
    const {adReportingUrl} = useSelector(currentUserSelector)

    
    return (
        <div className="layout-container">
            <div className={`${isSideNavBarOpen ? 'layout-body-compressed' : 'layout-body'}`}>
                <div className="layout-content">
                    <h1>Add Reportings</h1>

                    <div>
                        <iframe src={adReportingUrl} width={`${isSideNavBarOpen ? 1000 : 1120}`} height={600}>
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notes