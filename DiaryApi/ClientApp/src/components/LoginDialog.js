import React, { useState, Component } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, Alert } from "@mui/material";
import apiService from "./apiService";
export class LoginDialog extends Component {
    static displayName = LoginDialog.name;

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: "",
            user:"",
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

  
    handleLogin = async () => {
        try {
            
            const response = await apiService.getLoginUser(this.state);
            this.props.onLoginSuccess(response.data); // Pass user data to App
        } catch (err) {
            this.setState({ error: "Invalid username or password" });
        }
    };

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    {this.state.error && <Alert severity="error">{this.state.error}</Alert>}
                    <TextField margin="dense" label="Username" name="username" fullWidth value={this.state.username} onChange={this.handleChange} />
                    <TextField margin="dense" label="Password" name="password" type="password" fullWidth value={this.state.password} onChange={this.handleChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose}>Cancel</Button>
                    <Button onClick={this.handleLogin} variant="contained" color="primary">
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
export default LoginDialog;
