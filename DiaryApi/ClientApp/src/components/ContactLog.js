import React, { Component } from 'react';
import { Box, CircularProgress, Tabs, Tab, Typography } from "@mui/material";
import { withRouter } from "./withRouter";
import { Navigate } from "react-router-dom";
import { ContactNote } from "./ContactNote";
class ContactLog extends Component {
    static displayName = ContactLog.name;

    constructor(props) {
        super(props);
        this.state = { ActiveTab: 0, Reference: String, goBack: false, loading: true };
    }

    componentDidMount() {
        this.fetchData();
    }
    updateData() {

    }

    cancel = () => {
        this.setState({ goBack: true })
    };

    handleTabChange = (event, newValue) => {
        this.setState({ ActiveTab: newValue });
    }
    render() {
        if (this.state.goBack) {
            return <Navigate to='/contact' />
        }
        let contents = this.state.loading
            ? <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
            </Box>
            :
            <Box sx={{ width: "100%", mt: 2 }}>
                <Tabs value={this.state.ActiveTab}
                    onChange={this.handleTabChange}
                    centered
                    textColor="inherit"
                    indicatorColor="secondary"
                    sx={{
                        backgroundColor: "#1976d2",
                        color: "white",
                        borderRadius: "8px",
                    }}
                >
                    <Tab label="Contact"
                        sx={{
                            backgroundColor: this.state.activeTab === 0 ? "#1565c0" : "transparent", // Active tab color
                            color: "white",
                            "&:hover": { backgroundColor: "#1e88e5" }, // Hover effect
                        }}
                    />
                    <Tab label="Requirements" />
                    <Tab label="Financial" />
                    <Tab label="Mailings History" />
                    <Tab label="Viewings" />
                    <Tab label="Offers" />
                    <Tab label="Matching" />
                    <Tab label="Notes" />
                </Tabs>
                <Box sx={{ maxHeight: '90vh', p: 7, backgroundColor: "lightgrey", borderRadius: "8px", border: '1px solid', borderColor: '#ced7e0' }}>
                    {this.state.ActiveTab === 0 && (
                        <Typography variant="h6">Reference {this.state.Reference}</Typography>
                    )}
                    {this.state.ActiveTab === 1 && (
                        <Typography variant="h6">Requirements</Typography>
                    )}
                    {this.state.ActiveTab === 2 && (
                        <Typography variant="h6">Financial Page</Typography>
                    )}
                    {this.state.ActiveTab === 3 && (
                        <Typography variant="h6">Mailings History Page</Typography>
                    )}
                    {this.state.ActiveTab === 4 && (
                        <Typography variant="h6">Veiwings Page</Typography>
                    )}
                    {this.state.ActiveTab === 5 && (
                        <Typography variant="h6">Offers Page</Typography>
                    )}
                    {this.state.ActiveTab === 6 && (
                        <Typography variant="h6">Matching Page</Typography>
                    )}
                    {this.state.ActiveTab === 7 && (
                        <ContactNote Reference={this.state.Reference} />
                    )}
                </Box>
                <button className="btn btn-secondary" onClick={this.updateData}>Update</button>
                <button className="btn btn-primary" onClick={this.cancel}>Cancel</button>
            </Box>
        return (
            <div >
                {contents}
            </div>
        );
    }
    async fetchData() {
        this.setState({ Reference: this.props.location.state.reference, loading: false });
    }
}
export default withRouter(ContactLog)