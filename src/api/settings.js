import axios from './index'

class Settings {
    get = () => axios.get('Settings')
    update = data => axios.put('Settings', data)
}

export default new Settings()
