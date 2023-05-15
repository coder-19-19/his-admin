import axios from './index'

class Constants {
    get = id => axios.get(`AdminConstants/${id}`)
    update = data => axios.put('AdminConstants', data)
    getCertificates = () => axios.get('AdminCertificates')
    addCertificates = data => axios.post('AdminCertificates', data)
    deleteCertificates = id => axios.delete(`AdminCertificates/${id}`)
    getBlogs = () => axios.get('AdminBlogs')
    addBlog = data => axios.post('AdminBlogs', data)
    updateBlog = data => axios.put('AdminBlogs', data)
    deleteBlog = id => axios.delete(`AdminBlogs/${id}`)
    getServices = () => axios.get('AdminOurServices')
    addService = data => axios.post('AdminOurServices', data)
    updateService = data => axios.put('AdminOurServices', data)
    deleteService = id => axios.delete(`AdminOurServices/${id}`)
    getProjets = () => axios.get('AdminSelectedProjects')
    addProject = data => axios.post('AdminSelectedProjects', data)
    updateProject = data => axios.put('AdminSelectedProjects', data)
    deleteProject = id => axios.delete(`AdminSelectedProjects/${id}`)
}

export default new Constants()
