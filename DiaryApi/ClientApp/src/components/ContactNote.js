import React, { Component } from 'react';
import { withRouter } from "./withRouter";
import { Box, CircularProgress, List, ListItem, ListItemText, Typography,InputLabel } from "@mui/material";
import apiService from "./apiService";
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
export class ContactNote extends Component {
    static displayName = ContactNote.name;

    constructor(props) {
        super(props);
        this.state = { Notes: [], Reference: String, NoteType: 1, loading: true };
       
    }
    componentDidMount() {
        this.fetchData();
    }

    handleChangeEvent = (event) => {
        this.setState({ NoteType:event.target.value });
    }

    static renderNotes(Note,NoteType,change) {
        return (
            <Box>
                <FormControl fullWidth>
                <List sx={{ maxWidth: "100%",height:400,overflowY:"auto", bgcolor: "background.paper", borderRadius: 2 }}>
                    {Note.map((item, index) => (
                        <ListItem key={index} button>
                            <ListItemText primary={<Typography variant="h6" style={{ color: '#EFC3CA' }}>{item.CreationDateTime + ' ' + item.UserReference}</Typography>} secondary={item.Text} />
                        </ListItem>
                    ))}
                </List>
                
                </FormControl>
                <Box sx={{ display:"flex" ,alignItems:"center",gap:1,p:1}}>
                <button className="btn btn-secondary"  onClick={this.updateData}>Add Notes</button>
                <button className="btn btn-secondary"  onClick={this.cancel}>Print Notes</button>
                    <InputLabel sx={{p:1}} >Show notes of type: 
                <Select onChange={change} id="note-type-select" value={NoteType} sx={{ height: '38px'}}>
                    <MenuItem value={1}>{'<All>'}</MenuItem>
                    <MenuItem value={2}>{'Appraiser / Negotiator Changes'}</MenuItem>
                    <MenuItem value={3}>{'Fee Changes'}</MenuItem>
                        </Select>
                    </InputLabel>
                </Box>
            </Box>
        )
    }
    render() {

        let contents = this.state.loading
            ? <CircularProgress style={{ marginTop: "20px" }} />
            : ContactNote.renderNotes(this.state.Notes, this.state.NoteType, this.handleChangeEvent);
        return (

            <div >
                {contents}
            </div>

        );
    }


    async fetchData() {

        const data = await apiService.getContactNotes(this.props.Reference);

         function formatDate(dateval)
         {
             const date = new Date(dateval);
             const year = date.getFullYear();
             const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
             const day = String(date.getDate()).padStart(2, "0");
             const hours = String(date.getHours()).padStart(2, "0");
             const minutes = String(date.getMinutes()).padStart(2, "0");
             const seconds = String(date.getSeconds()).padStart(2, "0");

             return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
        const Note = data.Data.map(function (data) {
            data.CreationDateTime = formatDate(String(data.CreationDateTime));
            return data;
       });
        this.setState({ Notes: Note, loading: false });
    }

}
// default withRouter(ContactNote)