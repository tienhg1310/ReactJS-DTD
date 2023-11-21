import logo from "./logo.svg"
import "./App.css"
import UserClassComponent from "./components/UserClassComponent"
import UserFunctionComponent from "./components/UserFunctionComponent"

function App() {
    const [isShow, setIsShow] = useState(true)
    return (
        <div className="App">
            <UserClassComponent />
            {isShow && <UserFunctionComponent />}
            <button onClick={() => setIsShow((prevState) => !prevState)}>
                Change Is Show
            </button>
        </div>
    )
}

export default App
