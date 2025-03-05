import React, { Component } from 'react';
import apiService from "./apiService";
import { Box, CircularProgress, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Navigate } from "react-router-dom"
import { DataGridPro } from "@mui/x-data-grid-pro";
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
export class Contact extends Component {
    static displayName = Contact.name;

    constructor(props) {
        super(props);
        this.state = { Columns: [], Rows: [], userData: { ref: "Contactref" }, searchText:'', submitted: false, loading: true };
    }

    componentDidMount() {
        this.fetchData();
    };

    handleRowSelection = (params) => {
        this.setState({ userData: params.row.ContactReference, submitted: true });
    };

    escapeRegExp(value) {
            return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    requestSearch = (searchValue) => {
        let filtered = '';
        const searchRegex = new RegExp(this.escapeRegExp(searchValue), 'i');
        console.log(searchValue);
        filtered = this.state.Rows.filter((row) => {
            return Object.keys(row).some((ContactReference) => {
                return searchRegex.test(row[ContactReference]);
            });
        });
        console.log(filtered);
        if (filtered.length > 0)
        {
            this.setState({ userData: searchValue, submitted: true });
        }
        else {
            alert(searchValue + " Not found!");
        }
    }

    render() {
        if (this.state.submitted) {
            return <Navigate to='/contactlog' state={{ reference: this.state.userData }} />
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
                    selectionModel={this.state.selectedRow ? [this.state.selectedRow]:[] }
                    sx={{
                        '& .MuiDataGrid-columnHeader': {
                            backgroundColor: "#1976d2",
                            color: "white",
                            fontWeight: "bold", // Bold header text
                            fontSize: "16px",
                        },
                    }}
                    
                />                 
           
                    <TextField
                    variant="standard"
                    value={this.state.searchText}
                    onChange={(e) => { this.setState({ searchText:e.target.value });  }}
                        placeholder="Search..."
                    InputProps={{
                        startAdornment: <SearchIcon fontSize="small" color="action" onClick={(e) => { this.requestSearch(this.state.searchText); }} />,
                            endAdornment: (
                                <IconButton
                                    title="Clear"
                                    aria-label="Clear"
                                    size="small"
                                    style={{ visibility: this.state.searchText ? 'visible' : 'hidden', borderRadius: "57%", paddingRight: "1px", margin: "0", fontSize: "1.25rem" }}
                                    onClick={(e) => { this.setState({ searchText: '' }); }}
                                >
                                    <ClearIcon fontSize="small" color="action" />
                                </IconButton>
                            ),
                        }}
                        sx={{
                            width: { xs: 1, sm: 'auto' }, m: (theme) => theme.spacing(1, 0.5, 1.5),
                            '& .MuiSvgIcon-root': {
                                mr: 0.5,
                            },
                            '& .MuiInput-underline:before': {
                                borderBottom: 1,
                                borderColor: 'divider',
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
                    field: 'ContactReference',
                    headerName: 'Reference',
                    width: 150,
                    editable: true,
                },
                {
                    field: 'BrandDescription',
                    headerName: 'BrandDescription',
                    width: 150,
                    editable: true,
                },
                {
                    field: 'ContactType',
                    headerName: 'ContactType',
                    width: 150,
                    editable: true,
                },
                {
                    field: 'ShortName',
                    headerName: 'ShortName',
                    width: 150,
                    editable: true,
                },
                {
                    field: 'BuildingNumber',
                    headerName: 'BuildingNumber',
                    width: 150,
                    editable: true,
                },
                {
                    field: 'BuildingName',
                    headerName: 'BuildingName',
                    width: 150,
                    editable: true,
                },
                {
                    field: 'StreetNumber',
                    headerName: 'StreetNumber',
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
                    field: 'PostCode',
                    headerName: 'PostCode',
                    width: 150,
                    editable: true,
                },
                {
                    field: 'Negotiator',
                    headerName: 'Negotiator',
                    width: 150,
                    editable: true,
                },
                {
                    field: 'Surname',
                    headerName: 'Surname',
                    width: 150,
                    editable: true,
                },
            ];

 
            const data = await apiService.getContactItems();
            console.log(data.Data.length);
            var rowData = new Array(0);
            var i = 0;
            while (i < data.Data.length) {
                rowData.push({
                    id: i + 1, ContactReference: data.Data[i].ContactReference,
                    BrandDescription: data.Data[i].BrandDescription,
                    ContactType: data.Data[i].ContactType,
                    ShortName: data.Data[i].ShortName,
                    BuildingNumber: data.Data[i].BuildingNumber,
                    BuildingName: data.Data[i].BuildingName,
                    StreetNumber: data.Data[i].StreetNumber,
                    StreetName: data.Data[i].StreetName,
                    PostCode: data.Data[i].PostCode,
                    Negotiator: data.Data[i].Negotiator,
                    Surname: data.Data[i].Surname,

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