import { useSelector } from "react-redux"
import { isSideNavBarOpenSelector } from "../../store/dashboard/dashboard.selector"

const Notes = () => {
    const isSideNavBarOpen = useSelector(isSideNavBarOpenSelector)
    return (
        <div className="layout-container">
            {/* <div className={`${isSideNavBarOpen ? 'layout-body layout-body-compressed' : 'layout-body'}`}>
                <div className="layout-content">
                    <h1>Notes</h1>
                </div>
                <div>
                    <iframe src="https://www.agents.veronicasins.com/" width={1000} height={600}>

                    </iframe>
                </div>
            </div> */}
        </div>
    )
}

export default Notes