import Button from "../components/Button";
import "../components/Layout.css";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    function handleStartClick() {
        navigate("/login");
    }

    return (
        <div className="container main-box centered">
            <h1>Javapunk Coderunners</h1>
            <h2>Become the ultimate coderunner!</h2>
            <Button className="btn btn-primary" onClick={handleStartClick}>
                START!
            </Button>
        </div>
    );
}
export default Home;