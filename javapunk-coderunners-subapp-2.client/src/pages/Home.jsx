import Button from "../components/Button";
import "../components/Layout.css";

function Home() {
    return (
        <div className="container main-box centered">
            <h1>Javapunk Coderunners</h1>
            <h2>Become the ultimate coderunner!</h2>
            <Button className="btn-primary">START!</Button>
        </div>
    );
}
export default Home;