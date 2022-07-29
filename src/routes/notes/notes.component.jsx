import { useSelector } from "react-redux"
import { isSideNavBarOpenSelector } from "../../store/dashboard/dashboard.selector"

const Notes = () => {
    const isSideNavBarOpen = useSelector(isSideNavBarOpenSelector)
    return (
        <div className="layout-container">
            <div className={`${isSideNavBarOpen ? 'layout-body-compressed' : 'layout-body'}`}>
                <div className="layout-content">
                    <h1>Notes</h1>

                    <div>
                        <iframe src="https://dashthis.com/app/view/dashboard-Spyp89SH1UWYPhYANTCAJA?period=1" width={`${isSideNavBarOpen ? 1000 : 1120}`} height={600}>
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notes