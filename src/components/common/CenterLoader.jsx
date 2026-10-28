import "./CenterLoader.css";

function CenterLoader({
    size = 40,
    thickness = 4,
}) {
    return (
        <div className="center-loader-container">
            <div
                className="center-loader"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    borderWidth: `${thickness}px`,
                }}
            />
        </div>
    );
}

export default CenterLoader;