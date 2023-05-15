import axios from './index'

class Auth {
    get = () => axios.get('/AdminAuth/users')
    login = data => axios.post('/AdminAuth/login', data)
    add = data => axios.post('/AdminAuth/add-user', data)
    userUpdate = data => axios.put('/AdminAuth/update-password', data)
}

export default new Auth()
