import SignInPage from './pages/User/SignInPage';
import SingUpPage from './pages/User/SignUpPage';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import ListProductPage from "./pages/Product/ListProductPage";
import EditProductPage from "./pages/Product/EditProductPage";
import CreateProductPage from "./pages/Product/CreateProductPage";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    localStorage.getItem("token") ? <ListProductPage/> : <Navigate replace={true} to="/sign-in"/>
                }/>
                <Route path="/sign-in" element={
                    !localStorage.getItem("token") ? <SignInPage/> : <Navigate replace={true} to="/"/>
                }/>
                <Route path="/sign-up" element={
                    !localStorage.getItem("token") ? <SingUpPage/> : <Navigate replace={true} to="/"/>
                }/>

                <Route path="/edit-product" element={<EditProductPage/>}/>
                <Route path="/create-product" element={<CreateProductPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
