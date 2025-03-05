import React, { Component } from 'react';
import { CircularProgress, Button, Typography } from "@mui/material";
import apiService from "./apiService";

import { DataGrid} from "@mui/x-data-grid";
import Box from '@mui/system/Box';
import { withRouter } from "./withRouter";
import "./Styles.css";
class Diary extends Component {
    static displayName = Diary.name;
   
    constructor(props) {
        super(props);
        this.state = { UserNames: [], TimeCells: [], user: props.user,highLightedRows:[], DiaryTasks:[],CurrentDate: new Date(), UserData:null,loading: true }; 
    }

   
    componentDidMount() {
        this.fetchData();
    }

    getcurrentDate = () => {

        const year = this.state.CurrentDate.getFullYear();
        const month = this.state.CurrentDate.toLocaleString("en-US", { month: "short" }); // "Feb"
        const day = String(this.state.CurrentDate.getDate()).padStart(2, "0"); // Ensures two-digit day

        return `${year}-${month}-${day}`;
    };
    
   findArrayElementByTime(array, time) {
    return array.find((element) => {
        if (element.time === time)
            return element.id;
    })
    }

    
    findArrayElementByTaskOwner(array, owner) {
        return array.findIndex(obj => obj.UserReference === owner);       
    }
    



    getColumnRowStyles = () => {
        return this.state.UserData.reduce((acc, rowIds, colIndex) => {
            rowIds.forEach(rowId => {
                acc[`& .MuiDataGrid-cell[data-field="${'User'+colIndex}"][data-id="${rowId}"]`] = {
                    backgroundColor: "red !important",
                };
            });
            return acc;
        }, {});
    };
    getCellClassName = (params) => {
       
        for (let colIndex = 0; colIndex < this.state.UserData.length; colIndex++) {
            if ('User'+colIndex === params.field) {
                const rowIds = this.state.UserData[colIndex];
                if (rowIds.includes(params.id)) {
                    if (rowIds[0] === params.id) {
                        params.value = rowIds[0];
                    }
                    return "highlight-cell";
                }
            }
        }
        return ""; // Default class
    };

    incrementDate = () => {
        this.setState((prevState) => ({
            CurrentDate: new Date(prevState.CurrentDate.getTime() + 24 * 60 * 60 * 1000),
        }));
        this.fetchData();
    };

    // Function to decrement date by 1 day
    decrementDate = () => {
        this.setState((prevState) => ({
            CurrentDate: new Date(prevState.CurrentDate.getTime() - 24 * 60 * 60 * 1000),
        }));
        this.fetchData();
    };


    renderCell = (params) => {

        const firstHighlightedRow = this.state.UserData[params.id]; // Get the first highlighted row ID
        if (params.id === firstHighlightedRow) {
            return `${params.value} (Highlighted)`; // Append custom text to the first highlighted cell
        }
        return params.value;
    };

    generateTimeSlots() {
        let rows = [];
        let id = 1;
       
        for (let hour = 0; hour < 24; hour++) {
            let formattedHour = `${hour.toString().padStart(2, "0")}:00`;
            rows.push({ id: id++, time: formattedHour, isHour: true });
            [15, 30, 45].forEach((minute) => {
                rows.push({
                    id: id++,
                    time: `   ${minute}`, 
                    isHour: false,
                });
            });
        }

        return rows;
    }

    static renderUsers(UserNames, TimeCells, Branch, hRows, Users,DatePresent, DatePast, DateFuture) {
        const rowIndex = 32;
        const highLdRows = TimeCells
            .slice(rowIndex, rowIndex + 45)
            .map((row) => row.id);

        hRows = highLdRows;
      
      
        setTimeout(() => {
            const gridelement = document.querySelector(".MuiDataGrid-virtualScroller");
            if (gridelement) {
                const RowHeight = 12;
                const scrollPos = 48 * RowHeight
                gridelement.scrollTop = scrollPos;
            }
        }, 100);
        return (
            <div style={{ padding: "20px", textAlign: "center" }}>              
                <Box sx={{ height: "calc(100vh - 100px)", width: "100%", mt: 2 }}>
                    <DataGrid getRowHeight={() => 'auto'}
                        columns={UserNames}
                        rows={TimeCells}
                        pageSize={24}
                        disableColumnMenu
                        hideFooter
                        disableColumnResize
                        getCellClassName={Users}
                        sx={{
                            "& .MuiDataGrid-columnHeader": {
                                backgroundColor: "#1976d2", 
                                color: "white", 
                                fontWeight: "bold", 
                                fontSize: "16px",
                                position: "sticky",
                                top: 0,
                                zIndex: 2,
                            },
                            "& .MuiDataGrid-cell": {
                                fontSize: "12px",
                                borderBottom: "none", 
                            },
                            "& .MuiDataGrid-row": {
                                Height: "12px", 

                            },
                            ...hRows.reduce(
                                (acc, id) => ({
                                    ...acc,
                                    [`& .MuiDataGrid-row[data-id="${id}"]`]: {
                                        backgroundColor: "cadetblue !important",
                                    },

                                }),
                                {}
                              
                            ),
                           "& .highlight-cell": {
                                backgroundColor: "green !important",
                            },
                                
                        }}
                    />
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, p: 1 }}>
                    <Button variant="contained" color="primary" onClick={DatePast}>
                  {'<<'}
                </Button>
                <Typography variant="h6">
                        {DatePresent.toISOString().split("T")[0]} {/* Format: YYYY-MM-DD */}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={DateFuture}>
                  {'>>'}
                </Button>
                </Box>
                <p>{Branch}</p>
            </div>
        );
    }

    render() {

        let contents = this.state.loading
            ? <CircularProgress style={{ marginTop: "20px" }} />
            : Diary.renderUsers(this.state.UserNames, this.state.TimeCells, this.props.user.Data[0].UserReferenceWithBranch, this.state.highLightedRows, this.getCellClassName, this.state.CurrentDate, this.decrementDate, this.incrementDate);
      return (
      
        <div >
              {contents}
        </div>
        
    );
    }
    async fetchData() {
    try {

        const data = await apiService.getUSerDiaryItems(this.props.user.Data[0].BranchReference);
      
        const appointment = [];
        var timeData = this.generateTimeSlots();
        var rowData = new Array(0);
        const columnData  = new Array(0);
        var i = 0;
        while (i < data.Data.length) {
            if (i === 0) {
                columnData.push({
                    field: 'time',
                    flex:1,
                    headerName: "Time",
                    width: 70,
                    display:false,
                    sortable: false,
                    editable:false,
                });
            }
            columnData.push({ field: 'User' + i, flex: 2, headerName: data.Data[i].UserName, width: 150, editable: true, sortable: false });
            appointment[i]=[0];
            i++;
        }

        i = 0;
        var subindex = 0;
        var user;

        while (subindex < timeData.length) {
            user = {id: timeData[subindex].id, time:timeData[subindex].time};
            rowData.push(user);
            subindex++;
        }
        
      
        const date = this.getcurrentDate();
        i = 0;
        const task = await apiService.getUSerDiaryTasks(this.props.user.Data[0].BranchReference, date);
      
        var taskOwner = null;
        while (i < task.Data.length) {
           
            taskOwner = this.findArrayElementByTaskOwner(data.Data, task.Data[i].TaskOwner);
                if (taskOwner !== -1) {
                    const timeAt = new Date(task.Data[i].DueDate);
                    const set = String(timeAt.getHours()).padStart(2, "0") + ":00";
                    const timeEnd = new Date(task.Data[i].CompletionDate);
           
                    const duration = timeEnd - timeAt;
                    const rows = (duration / (1000 *60))/15;
                    const start = this.findArrayElementByTime(rowData, set)
                    const subject = task.Data[i].Subject;
                    appointment[taskOwner] = Array(rows + 2).fill(0).map((_, index) => index === 0 ? subject :start.id + (index-1));
                }
            
           i++;
        }
        const UserTasks = Array(data.Data.length).fill(0).map((_, index) => appointment[index]);

        this.setState({ UserNames: columnData, TimeCells: rowData, UserData: UserTasks, loading: false });
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
}
    
}
export default withRouter(Diary)