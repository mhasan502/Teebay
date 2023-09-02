import SignInPage from "./pages/User/SignInPage";
import SingUpPage from "./pages/User/SignUpPage";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import ProductPage from "./pages/Product/ProductPage";
import EditProductPage from "./pages/Product/EditProductPage";
import CreateProductPage from "./pages/Product/CreateProductPage";
import ProductDetailsPage from "./pages/Product/ProductDetailsPage";
import HistoryPage from "./pages/Product/HistoryPage";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    localStorage.getItem("token") ? <ProductPage/> : <Navigate replace={true} to="/sign-in"/>
                }/>
                <Route path="/sign-in" element={
                    !localStorage.getItem("token") ? <SignInPage/> : <Navigate replace={true} to="/"/>
                }/>
                <Route path="/sign-up" element={
                    !localStorage.getItem("token") ? <SingUpPage/> : <Navigate replace={true} to="/"/>
                }/>

                <Route path="/create-product" element={<CreateProductPage/>}/>
                <Route path="/edit-product/:id" element={<EditProductPage/>}/>
                <Route path="/product-details/:id" element={<ProductDetailsPage/>}/>
                <Route path="/history" element={<HistoryPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
