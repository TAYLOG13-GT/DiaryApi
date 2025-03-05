import React, { Component } from 'react';
import apiService from "./apiService";
import { Box, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { Navigate } from "react-router-dom"


export class Property extends Component {
    static displayName = Property.name;

    constructor(props) {
        super(props);
        this.state = { Columns: [], Rows: [],userData:{ref:"Propref"},submitted:false, loading: true }; 
    }
   
    componentDidMount() {
        this.fetchData();
    }

    handleRowSelection = (params) => {
        this.setState({ userData: params.row.PropertyReference, submitted: true });
    };
    render() {
        if (this.state.submitted) {
            return <Navigate to='/propertylog' state={{ reference: this.state.userData }} />
        }
        let contents = this.state.loading
            ? <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
            </Box>
            :
            <Box sx={{ height: "calc(100vh - 100px)", width: "100%", mt: 2 }}>
                <DataGrid
                    columns={this.state.Columns}
                    rows={this.state.Rows}
                    disableColumnMenu
                    disableColumnResize                   
                onRowClick={this.handleRowSelection}
                    sx={{
                        '& .MuiDataGrid-columnHeader': {
                            backgroundColor: "#1976d2",
                            color: "white",
                            fontWeight: "bold", // Bold header text
                            fontSize: "16px",
                        },
                    }}
                />
            </Box>
        return (

            <div >
                {contents}
            </div>
        );
    }


    async fetchData() {
        try {
           const columns = [
                {
                    field: 'PropertyReference',
                    headerName: 'Reference',
                    width: 150,
                    editable: true,
                },
                {
                    field: 'StreetNumber',
                    headerName: 'Steet Number',
                    width: 150,
                    editable: true,
                },
                {
                    field: 'StreetName',
                    headerName: 'StreetName',           
                    width: 150,
                    editable: true,
                },
                {
                    field: 'Area',
                    headerName: 'Area',
                    width: 150,
                    editable: true,
               },
               {
                   field: 'Town',
                   headerName: 'Town',
                   width: 150,
                   editable: true,
               },
               {
                   field: 'Status',
                   headerName: 'Status',
                   width: 150,
                   editable: true,
               },
               {
                   field: 'Price',
                   headerName: 'Price',
                   width: 150,
                   editable: true,
               },
            ];

            const data = await apiService.getPropertyItems();
            console.log(data.Data.length);
            var rowData = new Array(0);
            var i = 0;
            while (i < data.Data.length)     
            {
                rowData.push({
                    id: i + 1, PropertyReference: data.Data[i].PropertyReference,
                    StreetNumber: data.Data[i].StreetNumber,
                    StreetName: data.Data[i].StreetName,
                    Area: data.Data[i].Area,
                    Town: data.Data[i].Town,
                    Status: data.Data[i].Status,
                    Price: data.Data[i].Price,

                });
                i++;
            }
   
            this.setState({ Columns: columns, Rows: rowData, loading: false });
            console.log(this.state.Columns);
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
}
