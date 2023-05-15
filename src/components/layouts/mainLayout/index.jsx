import CustomSidebar from '../sidebar'
import {useEffect} from 'react'
import './index.scss'

const MainLayout = ({item}) => {
    // const navigate = useNavigate()
    // const token = localStorage.getItem('token')
    // if (!token) {
    //     navigate('/login')
    // }
    useEffect(() => {
        document.title = item.title
    }, [item.title])

    // const fetchUser = async() => {
    //     const {user} = await Auth.getUser()
    //     localStorage.setItem('user', JSON.stringify(user))
    // }
    //
    // useEffect(() => {
    //     fetchUser()
    // }, [])

    return (
        <>
            <CustomSidebar/>
            <div className="container">
                {item.component}
            </div>
        </>
    )
}

export default MainLayout
