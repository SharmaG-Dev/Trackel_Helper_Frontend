import { Box } from '@mui/material';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import React, { Fragment, useState } from 'react'
import { Button } from 'reactstrap';

import { mockDataContacts } from '../../data/mockData';
import AddServiceProvider from './Forms/AdminAddServiceProvider';
import { useNavigate } from 'react-router-dom/dist';
import AdminDataTable from '../../Elements/AdminDataTable';
import ModalComponent from '../../Elements/ModalComponent';
import AdminAddServiceProvider from './Forms/AdminAddServiceProvider';
import { useSelector } from 'react-redux';
import { WaitLoader } from '../../Elements/WaitLoader';

const ManageServiceProvider = () => {

    const navigate = useNavigate()

    const [Block, setBlock] = useState(false)

    const ImageResult = useSelector(pre => pre.ImageUploadReducer);


    const column = [
        { field: "id", headerName: "Sr No", flex: 1, minWidth: 50, editable: true },
        { field: "refName", headerName: "Ref Name", minWidth: 120, editable: true },
        { field: "name", headerName: "Name", minWidth: 120, editable: true },
        { field: "providerType", headerName: "Provider Type", minWidth: 120, editable: true },
        { field: "servicename", headerName: "Service Name", minWidth: 400, editable: true },
        { field: "aadhaarNumber", headerName: "Aadhaar No.", minWidth: 120, editable: true },
        { field: "mobileNumber", headerName: "Mobile No.", minWidth: 120, editable: true },
        { field: "email", headerName: "Email", minWidth: 120, editable: true },
        { field: "address", headerName: "Address", minWidth: 250, editable: true },
        { field: "username", headerName: "User Name", minWidth: 250, editable: true },
        { field: "password", headerName: "password", minWidth: 250, editable: true },
        { field: "zipCode", headerName: "Password", minWidth: 120, editable: true },
        {
            field: "status",
            minWidth: 150,
            headerName: "Admin Status",
            renderCell: (params) => (
                <Button className="text-white bg-green">Approved</Button>
            ),
        },
        {
            field: "action",
            headerName: "Action",
            minWidth: 250,
            renderCell: (params) => (
                <div className="d-flex gap-2">
                    <Button className="text-white bg-blue">Edit</Button>
                    <Button className="text-white bg-green">View</Button>
                    <Button className="text-white bg-red">Delete</Button>
                </div>
            ),
        },
        {
            field: "block",
            headerName: "Block",
            minWidth: 320,
            renderCell: (params) => (
                <div className="d-flex gap-2">
                    {Block ?
                        <Button className="text-white bg-warning border-warning" onClick={() => setBlock(false)}>Un-Block</Button>
                        :
                        <Button className="text-white bg-red" onClick={() => setBlock(true)}>Block </Button>
                    }
                    <Button className='text-white bg-green'> Reset Ratings </Button>
                </div>
            ),
        },
    ];

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <GridToolbarQuickFilter />
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarExport />
                <GridToolbarDensitySelector />
            </GridToolbarContainer>
        );
    }
    // Add service provider controller 
    const [AddService, setAddServicer] = useState(false)
    const ToggleAddServiceMan = () => setAddServicer(!AddService)
    return (
        <Fragment>
            
            <ModalComponent data={<AdminAddServiceProvider />} modal={AddService} toggle={ToggleAddServiceMan} size={"xl"} scrollable={true} modalTitle={"Add Service Provider"} />
            <h4 className='p-3 px-4 mt-3 bg-transparent headingBelowBorder text-white' style={{ maxWidth: "fit-content" }}>Service Provider List</h4>
            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3'>

                <div className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center `} onClick={ToggleAddServiceMan} style={{ minWidth: "15rem", maxWidth: "15rem" }} >
                    Add Service Provider
                </div>
            </div>
            <div className='p-4'>
                <AdminDataTable rows={mockDataContacts} columns={column} CustomToolbar={CustomToolbar} />
            </div>
        </Fragment>
    )
}

export default ManageServiceProvider