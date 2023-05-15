import {useEffect, useState} from 'react'
import Auth from '../../api/auth'
import {Button} from 'primereact/button'
import {Checkbox} from 'primereact/checkbox'
import {ProgressSpinner} from 'primereact/progressspinner'

const RoleForm = ({form, setForm, fetchData}) => {
    const [permissions, setPermissions] = useState([])
    const [loader, setLoader] = useState(false)
    const [isFetching, setIsFetching] = useState(true)
    const [userPermisions, setUserPermissions] = useState(form?.permissons?.map(item => item?.id))

    const fetchPermissions = async() => {
        const res = await Auth.permissions()
        setPermissions(res)
    }

    const fetchAllData = async() => {
        setIsFetching(true)
        await Promise.all([fetchPermissions()])
        setIsFetching(false)
    }

    const submit = async() => {
        setLoader(true)
        try {
            await Auth.addPermission({
                userId: form?.id,
                permissions: userPermisions
            })
            fetchData()
            setForm(null)
        } catch (e) {
            return false
        } finally {
            setLoader(false)
        }
    }
    useEffect(() => {
        fetchAllData()
    }, [])

    return (
        <form onSubmit={submit}>
            {isFetching ? (
                <div className="flex mt-5 justify-content-center align-items-center">
                    <ProgressSpinner/>
                </div>
            ) : (
                <>
                    {permissions.map(item => (
                        <div className="col-12">
                            <div className="flex align-items-center">
                                <Checkbox inputId={item?.id} name={item?.id} value={item?.id} onChange={() => {
                                    if (userPermisions?.includes(item?.id)) {
                                        let newPer = [...userPermisions]
                                        newPer = newPer?.filter(item2 => item2 !== item?.id)
                                        setUserPermissions(newPer)
                                        return
                                    }
                                    setUserPermissions(prev => ([...prev, item?.id]))
                                }}
                                checked={userPermisions?.includes(item?.id)}/>
                                <label htmlFor={item?.id} className="ml-2">{item?.title}</label>
                            </div>
                        </div>
                    ))}
                    <div className="col-12">
                        <div className="flex justify-content-end gap-2">
                            <Button onClick={submit} className="p-button-danger p-button-sm" disabled={loader}>
                                {loader && <i className="pi pi-spin pi-spinner mr-1"/>}
                Yadda saxla
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </form>
    )
}

export default RoleForm
