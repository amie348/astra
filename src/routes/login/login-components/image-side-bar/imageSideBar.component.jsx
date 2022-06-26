import './imageSideBar.styles.scss'

const ImageSideBar = ({ imageUrl, quote }) => {
    return (
        <>
            <div className="login-image-bar">
                <div className="background-image" style={{
                    backgroundImage: `url(${imageUrl})`
                }}></div>

                <div className="content">
                    <h4>{`${quote.author}`}</h4>
                    <p>{`${quote.text}`}</p>
                </div>
            </div>
        </>
    )
}

export default ImageSideBar