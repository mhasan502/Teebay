import {loadErrorMessages, loadDevMessages} from "@apollo/client/dev";
import SignInPage from './components/SignIn';
import SingUpPage from './components/SignUp';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";


if (process.env.NODE_ENV !== "production") {  // Adds messages only in a dev environment
    loadDevMessages();
    loadErrorMessages();
}


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<SingUpPage/>}/>
                <Route path="/signin" element={<SignInPage/>}/>

                <Route path="/" element={
                    localStorage.getItem("token") ? "Hello" : <Navigate replace={true} to="/signin"/>
                }/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
