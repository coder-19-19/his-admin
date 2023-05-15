import {ProgressSpinner} from 'primereact/progressspinner'
import {useEffect, useState} from 'react'
import {Button} from 'primereact/button'
import Auth from '../../api/auth'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import {Dialog} from 'primereact/dialog'
import AddForm from './AddForm'
import UpdateForm from './UpdateForm'

const Users = () => {
    const [isFetching, setIsFetching] = useState(true)
    const [data, setData] = useState(null)
    const [form, setForm] = useState(false)
    const [updateForm, setUpdateForm] = useState(false)

    const fetchData = async() => {
        setIsFetching(true)
        const data = await Auth.get()
        setData(data?.map(item => {
            return {
                ...item,
                buttons: <div className="flex gap-1">
                    <Button className="p-button-danger" onClick={() => setUpdateForm(item)}>
                        <i className="pi pi-lock"/>
                    </Button>,
                </div>
            }
        }))
        setIsFetching(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="about-page w-full">
            {isFetching ? (
                <div className="flex mt-5 justify-content-center align-items-center">
                    <ProgressSpinner/>
                </div>
            ) : (
                <div className="content w-full">
                    <p className="page-title">İstifadəçilər</p>
                    <div className="col-12">
                        <Button onClick={() => setForm(true)} className="b-button p-button-danger">Əlavə et</Button>
                    </div>
                    <Dialog
                        header="İstifadəçi əlavə et"
                        visible={form}
                        draggable={false}
                        onHide={() => setForm(null)}
                        style={{width: '50vw'}} breakpoints={{'960px': '75vw', '641px': '100vw'}}>
                        <AddForm fetchData={fetchData} setForm={setForm}/>
                    </Dialog>
                    <Dialog
                        header="Şifrəni dəyiş"
                        visible={form}
                        draggable={false}
                        onHide={() => setUpdateForm(null)}
                        style={{width: '50vw'}} breakpoints={{'960px': '75vw', '641px': '100vw'}}>
                        <UpdateForm fetchData={fetchData} form={updateForm} setForm={setUpdateForm}/>
                    </Dialog>
                    <DataTable paginator rows={10} rowsPerPageOptions={[10, 20, 30]} emptyMessage="Məlumat yoxdur"
                        className="mt-5" value={data} responsiveLayout="scroll">
                        <Column field="id" header="№" sortable/>
                        <Column field="username" header="İstifadəçi adı" sortable/>
                        <Column field="firstname" header="Ad" sortable/>
                        <Column field="lastname" header="Soyad" sortable/>
                        <Column field="buttons"/>
                    </DataTable>
                </div>
            )}
        </div>
    )
}

export default Users
