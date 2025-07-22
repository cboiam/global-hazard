import "../styles/layout.css";

const Loading = ({ visible }: { visible: boolean }) => {
    return (
        <div className={`loadingPanel ${visible ? "loadingVisible" : "loadingHidden"}`}>
            <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="loading" className="loading" />
        </div>
    );
};

export default Loading;