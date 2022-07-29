import { useSelector } from "react-redux"
import { isSideNavBarOpenSelector } from "../../store/dashboard/dashboard.selector"
import { currentUserSelector } from '../../store/user/user.selectors';

const Notes = () => {
    
    const isSideNavBarOpen = useSelector(isSideNavBarOpenSelector)
    const {user} = useSelector(currentUserSelector)

    const {addReportingUrl} = user
    
    return (
        <div className="layout-container">
            <div className={`${isSideNavBarOpen ? 'layout-body-compressed' : 'layout-body'}`}>
                <div className="layout-content">
                    <h1>Add Reportings</h1>

                    <div style={{height: "900px", width:"98%"}}>
                        <iframe src={addReportingUrl} width={`${isSideNavBarOpen ? 1000 : 1120}`} height={550}>
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notes