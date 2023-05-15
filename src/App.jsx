import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {routeArr} from './routes'
import MainLayout from './components/layouts/mainLayout'
import '../node_modules/primeflex/primeflex.scss'
import Login from './views/auth/login'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import setConfig from './dateConfig'

const App = () => {
    setConfig()
    return (
        <>
            <ToastContainer autoClose="500"/>
            <BrowserRouter>
                <Routes>
                    {routeArr.map((item, index) => (
                        <Route index exact path={item.path} key={index} element={
                            <MainLayout item={item}/>
                        }/>
                    ))}
                    <Route path="/login" exact element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
