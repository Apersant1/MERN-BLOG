import React,{ useEffect} from "react"
import {useDispatch,useSelector} from "react-redux"
import {Route, Routes} from "react-router-dom";

import {fetchAuthMe, isAuthSelector} from "./redux/slices/auth";

import Container from "@mui/material/Container";
import {Header} from "./components";
import {AddPost, FullPost, Home, Login, Registration} from "./pages";


function App() {

    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthSelector)

    useEffect(() => {
        dispatch(fetchAuthMe())
    }, []);

    return (<>

        <Header/>
        <Container maxWidth="lg">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/posts/:id" element={<FullPost/>}/>
                <Route path="/posts/:id/edit" element={<AddPost/>}/>
                <Route path="/add-post" element={<AddPost/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Registration/>}/>
            </Routes>
        </Container>
    </>);
}

export default App;
