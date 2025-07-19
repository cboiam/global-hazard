import "../styles/loading.css";

const Loading = ({ visible }: { visible: boolean }) => {
    return (
        <div className="loading-panel" style={{ height: visible ? "inherit" : 0, visibility: visible ? "visible" : "hidden" }}>
            <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="loading" className="loading animate" />
        </div>
    );
};

export default Loading;