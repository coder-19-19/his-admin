import {useState} from 'react'
import './index.scss'
import {routeArr, routes} from '../../../routes'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import classNames from 'classnames'
import Logo from '../../../assets/images/favicon.png'

const CustomSidebar = () => {
    const [actvie, setActive] = useState(true)
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()

    const logout = async() => {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <div className={classNames({
            sidebar: true,
            active: actvie
        })}>
            <div className="toggle-sidebar" onClick={() => setActive(!actvie)}>
                <i className={classNames({
                    pi: true,
                    'text-white': true,
                    'pi-chevron-left': actvie,
                    'pi-chevron-right': !actvie
                })}/>
            </div>
            <Link to={routes.dashboard.path}
                className="img flex justify-content-center">
                <img width="50" height="50" src={Logo} alt="HIS"/>
            </Link>
            <nav>
                <ul className="menu">
                    {routeArr.filter(item => !item?.isSite).map(item => (
                        Array.isArray(item.roles) && !item.roles.includes(user?.role) || item.path.includes('/:id') ? null : (
                            item?.show && (
                                <li key={item.path}>
                                    <NavLink to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </NavLink>
                                </li>
                            )
                        )
                    ))}
                </ul>
                <ul className="menu">
                    {routeArr.filter(item => item?.isSite).map(item => (
                        Array.isArray(item.roles) && !item.roles.includes(user?.role) || item.path.includes('/:id') ? null : (
                            <li key={item.path}>
                                <NavLink to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </NavLink>
                            </li>
                        )
                    ))}
                </ul>
                <div className="logout" onClick={logout}>
                    <i className={classNames({
                        pi: true,
                        'pi-sign-out': true
                    })}/>
                    <span>Çıxış et</span>
                </div>
            </nav>
        </div>
    )
}

export default CustomSidebar
