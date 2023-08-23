import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import LoginPage from './components/login';


if (process.env.NODE_ENV !== "production") {  // Adds messages only in a dev environment
    loadDevMessages();
    loadErrorMessages();
}


function App() {
    return (
        <div className="App">
            <LoginPage/>
        </div>
    );
}

export default App;
