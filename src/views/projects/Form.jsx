import {Controller, useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {useEffect, useState} from 'react'
import Constants from '../../api/constants'
import {InputText} from 'primereact/inputtext'
import {InputTextarea} from 'primereact/inputtextarea'
import {Dropdown} from 'primereact/dropdown'
import {Button} from 'primereact/button'

const Form = ({form, setForm, fetchData}) => {
    const {control, handleSubmit, reset} = useForm()
    const [loader, setLoader] = useState(false)
    const [file, setFile] = useState(null)
    const [galleryImages, setGalleryImages] = useState([])
    const [galleryFiles, setGalleryFiles] = useState([])

    const submit = async data => {
        const formData = new FormData()
        delete data.mainImageUrl
        delete data.mainImage
        delete data.galleryImages

        Object.keys(data).forEach(item => {
            formData.append(item, data[item])
        })

        formData.append('mainImage', file)
        if (galleryFiles.length) {
            galleryFiles.forEach(item => {
                formData.append('galleryImages', item?.file)
            })
        } else {
            formData.append('galleryImages', null)
        }

        setLoader(true)
        try {
            await Constants[form?.id ? 'updateProject' : 'addProject'](formData)
            fetchData()
            setForm(null)
        } catch (e) {
            toast.error('Xəta baş verdi')
        }
        setLoader(true)
    }

    const getProject = async() => {
        const res = await Constants.getProject(form?.id)
        setGalleryImages(res?.imageUrls)
    }

    const types = [
        {
            label: 'Featured',
            value: 'FEATURED'
        },
        {
            label: 'Completed',
            value: 'COMPLETED'
        },
        {
            label: 'Ongoing',
            value: 'ONGOING'
        }
    ]

    useEffect(() => {
        if (form?.id) {
            getProject()
            reset(form)
        }
    }, [form])

    return (
        <form onSubmit={handleSubmit(submit)} className="grid w-full">
            <Controller control={control} render={({field: {value, onChange}}) => (
                <div className="col-12">
                    <label
                        htmlFor="nameAZ">Başlıq (az)</label>
                    <InputText className="w-full" name="nameAZ" id="nameAZ" value={value}
                        onChange={onChange}/>
                </div>
            )} name="nameAZ"/>
            <Controller control={control} render={({field: {value, onChange}}) => (
                <div className="col-12">
                    <label
                        htmlFor="nameEN">Başlıq (en)</label>
                    <InputText className="w-full" name="nameEN" id="nameEN" value={value}
                        onChange={onChange}/>
                </div>
            )} name="nameEN"/>
            <Controller control={control} render={({field: {value, onChange}}) => (
                <div className="col-12">
                    <label
                        htmlFor="nameRU">Başlıq (ru)</label>
                    <InputText className="w-full" name="nameRU" id="nameRU" value={value}
                        onChange={onChange}/>
                </div>
            )} name="nameRU"/>
            <Controller control={control} render={({field: {value, onChange}}) => (
                <div className="col-12">
                    <label
                        htmlFor="descriptionAZ">Açıqlama (az)</label>
                    <InputTextarea rows="10" className="w-full" name="descriptionAZ" id="descriptionAZ" value={value}
                        onChange={onChange}/>
                </div>
            )} name="descriptionAZ"/>
            <Controller control={control} render={({field: {value, onChange}}) => (
                <div className="col-12">
                    <label
                        htmlFor="descriptionEN">Açıqlama (en)</label>
                    <InputTextarea rows="10" className="w-full" name="descriptionEN" id="descriptionEN" value={value}
                        onChange={onChange}/>
                </div>
            )} name="descriptionEN"/>
            <Controller control={control} render={({field: {value, onChange}}) => (
                <div className="col-12">
                    <label
                        htmlFor="descriptionRU">Açıqlama (ru)</label>
                    <InputTextarea rows="10" className="w-full" name="descriptionRU" id="descriptionRU" value={value}
                        onChange={onChange}/>
                </div>
            )} name="descriptionRU"/>
            <Controller control={control} render={({field: {value, onChange}}) => (
                <div className="col-12">
                    <label
                        htmlFor="type">Tip</label>
                    <Dropdown
                        value={value}
                        onChange={onChange}
                        options={types}
                        id="type"
                        name="type"
                        className="w-full"/>
                </div>
            )} name="type"/>
            <div className="col-12">
                <label
                    className="p-button p-button-secondary"
                    htmlFor="file">{file ? 'Şəkli dəyiş' : 'Şəkil seç'}</label>
                <input className="v-hidden" type="file" accept=".png,.jpg,.jpeg,.jiff" name="file"
                    id="file"
                    onChange={e => setFile(e.target.files[0])}/>
            </div>
            {(file || form?.mainImageUrl) && (
                <div className="col-12">
                    <img width="150" height="150"
                        src={file ? URL.createObjectURL(file) : `${process.env.REACT_APP_FILE_URL}${form?.mainImageUrl}`}
                        alt="Image"/>
                </div>
            )}
            <div className="col-12"><label>Qalerya</label></div>
            <div className="col-12">
                <label
                    className="p-button p-button-secondary"
                    htmlFor="files">Şəkil seç</label>
                <input className="v-hidden" multiple type="file" accept=".png,.jpg,.jpeg,.jiff" name="files"
                    id="files"
                    onChange={e => {
                        Array.from(e.target.files).forEach(item => {
                            setGalleryFiles(prev => ([
                                ...prev,
                                {
                                    id: Math.random(),
                                    file: item
                                }
                            ]))
                        })
                    }
                    }/>
            </div>
            {galleryImages?.map((item, index) => (
                <div className="col-12 md:col-3" key={index}>
                    <div className="flex flex-column gap-1">
                        <img width="100%" height="150"
                            src={`${process.env.REACT_APP_FILE_URL}${item?.imageUrl}`}
                            alt="Image"/>
                        <Button className="p-button-danger" onClick={async(e) => {
                            e.preventDefault()
                            await Constants.deleteProjectImages(item?.id)
                            let newImages = [...galleryImages]
                            newImages = newImages.filter(item2 => item?.id !== item2?.id)
                            setGalleryImages(newImages)
                        }}>Sil</Button>
                    </div>
                </div>
            ))}
            {galleryFiles?.map((item, index) => (
                <div className="col-12 md:col-3" key={index}>
                    <div className="flex flex-column gap-1">
                        <img width="100%" height="150"
                            src={URL.createObjectURL(item?.file)}
                            alt="Image"/>
                        <Button className="p-button-danger text-center" onClick={(e) => {
                            e.preventDefault()
                            let newImages = [...galleryFiles]
                            newImages = newImages.filter(item2 => item?.id !== item2?.id)
                            setGalleryFiles(newImages)
                        }}>Sil</Button>
                    </div>
                </div>
            ))}
            <div className="col-12">
                <div className="flex justify-content-end">
                    <Button className="p-button-danger d-flex align-items-center gap-1" disabled={loader}>
                        {loader && <i className="pi pi-spin pi-spinner mr-1"/>}
            Yadda saxla
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default Form
