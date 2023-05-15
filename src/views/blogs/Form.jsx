import {Controller, useForm} from 'react-hook-form'
import {toast} from 'react-toastify'
import {useEffect, useState} from 'react'
import Constants from '../../api/constants'
import {InputText} from 'primereact/inputtext'
import {InputTextarea} from 'primereact/inputtextarea'
import {Button} from 'primereact/button'

const Form = ({form, setForm, fetchData}) => {
    const {control, handleSubmit, reset} = useForm()
    const [loader, setLoader] = useState(false)
    const [file, setFile] = useState(null)

    const submit = async data => {
        const formData = new FormData()
        delete data.file

        Object.keys(data).forEach(item => {
            formData.append(item, data[item])
        })

        formData.append('file', file)

        setLoader(true)
        try {
            await Constants[form?.id ? 'updateBlog' : 'addBlog'](formData)
            fetchData()
            setForm(null)
        } catch (e) {
            toast.error('Xəta baş verdi')
        }
        setLoader(true)
    }

    useEffect(() => {
        if (form?.id) {
            reset(form)
        }
    }, [form])

    return (
        <form onSubmit={handleSubmit(submit)} className="grid w-full">
            <Controller control={control} render={({field: {value, onChange}}) => (
                <div className="col-12">
                    <label
                        htmlFor="titleAZ">Başlıq (az)</label>
                    <InputText className="w-full" name="titleAZ" id="titleAZ" value={value}
                        onChange={onChange}/>
                </div>
            )} name="titleAZ"/>
            <Controller control={control} render={({field: {value, onChange}}) => (
                <div className="col-12">
                    <label
                        htmlFor="titleEN">Başlıq (en)</label>
                    <InputText className="w-full" name="titleEN" id="titleEN" value={value}
                        onChange={onChange}/>
                </div>
            )} name="titleEN"/>
            <Controller control={control} render={({field: {value, onChange}}) => (
                <div className="col-12">
                    <label
                        htmlFor="titleRU">Başlıq (ru)</label>
                    <InputText className="w-full" name="titleRU" id="titleRU" value={value}
                        onChange={onChange}/>
                </div>
            )} name="titleRU"/>
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
            <div className="col-12">
                <label
                    className="p-button p-button-secondary"
                    htmlFor="file">{file ? 'Şəkli dəyiş' : 'Şəkil seç'}</label>
                <input className="v-hidden" type="file" accept=".png,.jpg,.jpeg,.jiff" name="file"
                    id="file"
                    onChange={e => setFile(e.target.files[0])}/>
            </div>
            {(file || form?.imageUrl) && (
                <div className="col-12">
                    <img width="150" height="150"
                        src={file ? URL.createObjectURL(file) : `${process.env.REACT_APP_FILE_URL}${form?.imageUrl}`}
                        alt="Image"/>
                </div>
            )}
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
