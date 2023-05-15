import {Fragment, useEffect, useState} from 'react'
import Constants from '../../api/constants'
import {ProgressSpinner} from 'primereact/progressspinner'
import {Controller, useForm} from 'react-hook-form'
import {InputText} from 'primereact/inputtext'
import {Button} from 'primereact/button'
import {InputTextarea} from 'primereact/inputtextarea'

const Constant = ({id, title}) => {
    const [isFetching, setIsFetching] = useState(true)
    const [loader, setLoader] = useState(false)
    const [data, setData] = useState(null)
    const [file, setFile] = useState(null)

    const {control, reset, handleSubmit} = useForm()

    const fetchData = async() => {
        setIsFetching(true)
        const data = await Constants.get(id)
        setData(data)
        reset(data)
        setIsFetching(false)
    }

    const update = async(data) => {
        try {
            data.id = id
            delete data.file
            const formData = new FormData()
            Object.keys(data).forEach(item => {
                formData.append(item, data[item] || '')
            })

            formData.append('file', file)

            setLoader(true)
            await Constants.update(formData)
            setLoader(false)
        } catch (e) {
            setLoader(false)
        }
    }

    useEffect(() => {
        setFile(null)
        fetchData()
    }, [id])

    const names = {
        titleEN: 'Başlıq (en)',
        titleAZ: 'Başlıq (az)',
        titleRU: 'Başlıq (ru)',
        descriptionEN1: 'Açıqlama (en)',
        descriptionAZ1: 'Açıqlama (az)',
        descriptionRU1: 'Açıqlama (ru)'
    }

    return (
        <div className="about-page w-full">
            {isFetching ? (
                <div className="flex mt-5 justify-content-center align-items-center">
                    <ProgressSpinner/>
                </div>
            ) : (
                <div className="content w-full">
                    <p className="page-title">{title}</p>
                    <form onSubmit={handleSubmit(update)}>
                        <div className="grid w-full">
                            {data && Object.keys(data).map(item => (
                                <Fragment key={item}>
                                    {!['id', 'imageUrl', 'file'].includes(item) && (
                                        (id !== 'career' && !item.includes('2') || id === 'career') && (
                                            <Controller control={control} render={({field: {value, onChange}}) => (
                                                <div className="col-12 col:md-6">
                                                    <label
                                                        htmlFor={item}>{names[item] || item.charAt(0).toUpperCase() + item.slice(1)}</label>
                                                    {item.includes('description') ? (
                                                        <InputTextarea rows="10" className="w-full" name={item} id={item} value={value}
                                                            onChange={onChange}/>
                                                    ) : (
                                                        <InputText className="w-full" name={item} id={item} value={value}
                                                            onChange={onChange}/>
                                                    )}
                                                </div>
                                            )} name={item}/>
                                        )
                                    )}
                                </Fragment>
                            ))}
                            <Controller control={control} render={({field: {value, onChange}}) => (
                                <div className="col-12 col:md-6">
                                    <label
                                        className="p-button p-button-secondary"
                                        htmlFor="file">Şəkil seç</label>
                                    <input className="v-hidden" type="file" accept=".png,.jpg,.jpeg,.jiff" name="file"
                                        id="file"
                                        value={value}
                                        onChange={e => setFile(e.target.files[0])}/>
                                </div>
                            )} name="file"/>
                            <div className="col-12 col:md-6">
                                <img width="150" height="150"
                                    src={file ? URL.createObjectURL(file) : `${process.env.REACT_APP_FILE_URL}${data.imageUrl}`}
                                    alt="Image"/>
                            </div>
                        </div>
                        <div className="grid">
                            <div className="col-12">
                                <div className="flex justify-content-end">
                                    <Button className="p-button-danger d-flex align-items-center gap-1" disabled={loader}>
                                        {loader && <i className="pi pi-spin pi-spinner mr-1"/>}
                    Yadda saxla
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Constant
