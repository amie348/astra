import { useSelector } from "react-redux"
import { isSideNavBarOpenSelector } from "../../store/dashboard/dashboard.selector"

const Notes = () => {
    const isSideNavBarOpen = useSelector(isSideNavBarOpenSelector)
    return (
        <div className="layout-container">
            <div className={`${isSideNavBarOpen ? 'layout-body layout-body-compressed' : 'layout-body'}`}>
                <div className="layout-content">
                    <h1>Notes</h1>
                </div>
                <div>
                  
                    <iframe src="https://dashthis.com/app/view/dashboard-Spyp89SH1UWYPhYANTCAJA?period=1" width={1500} height={600}>

                    </iframe>
                </div>
            </div>
        </div>
    )
}

export default Notes