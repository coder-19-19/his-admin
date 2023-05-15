import Dashboard from './views/dashboard'
import Settings from './views/settings'
import Constants from './views/constant'
import Certificates from './views/certificates'
import Blogs from './views/blogs'
import Services from './views/services'
import Projects from './views/projects'
import Users from './views/users'

const routeItem = (title, path, component, icon, roles, isSite = false, show = true) => {
    return {
        title,
        path,
        component,
        icon,
        show,
        roles,
        isSite
    }
}

const routes = {
    dashboard: routeItem('ThreeSteps', '/dashboard', <Dashboard/>, <i className="pi pi-user"/>, null, false, false),
    users: routeItem('İstifadəçilər', '/users', <Users/>, <i className="pi pi-users"/>),
    'news': routeItem('Xəbərlər', '/news', <Blogs/>, <i className="pi pi-list"/>),
    services: routeItem('Xidmətlər', '/services', <Services/>, <i className="pi pi-list"/>),
    'selected-projects': routeItem('Layihələr', '/selected-projects', <Projects/>, <i className="pi pi-list"/>),
    'about-us': routeItem('Haqqımızda', '/about-us', <Constants id="about-us" title="Haqqımızda"/>, <i
        className="pi pi-info-circle"/>),
    career: routeItem('Karyera', '/career', <Constants id="career" title="Karyera"/>, <i
        className="pi pi-database"/>),
    safety: routeItem('Təhlükəsizlik', '/safety', <Constants id="safety" title="Təhlükəsizlik"/>, <i
        className="pi pi-lock"/>),
    certificates: routeItem('Sertifikatlar', '/certificates', <Certificates/>, <i className="pi pi-file"/>),
    settings: routeItem('Ayarlar', '/settings', <Settings/>, <i className="pi pi-cog"/>, true)
}

const routeArr = Object.values(routes)

export {
    routes,
    routeArr
}
