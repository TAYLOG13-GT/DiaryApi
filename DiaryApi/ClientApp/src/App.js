import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import { LoginDialog } from './components/LoginDialog';
import Diary from "./components/Diary";
import { Container, CircularProgress, Button,Typography } from "@mui/material";
import './custom.css';
export default class App extends Component {
    static displayName = App.name;
    
    constructor(props) {
        super(props);
        this.state = {open:true,user: null };
    }

    handleLoginSuccess = (userData) => {
        this.setState({ user: userData, open: false});
    };
    render() {
        return (
            <Container>
                {this.state.user ? (
                    < Layout >
                        <Routes> 
                         {AppRoutes.map((route, index) => {
                             const { element, ...rest } = route;
                             return <Route key={index} {...rest} element={React.cloneElement(route.element, { user: this.state.user })} />;
                         })}
                     </Routes>
                 </Layout>
                ) : (
                        <Typography/>
                )}
                <LoginDialog open={this.state.open} onClose={() => this.setState({ open:false })} onLoginSuccess={this.handleLoginSuccess} />
            </Container>
        );
    }
  //  render() {
       
  //      return (
  //              < Layout >
  //                   <Routes>
  //                       {AppRoutes.map((route, index) => {
  //                           const { element, ...rest } = route;
  //                           return <Route key={index} {...rest} element={element} />;
  //                       })}
  //                   </Routes>
  //               </Layout>
  //      );

  //}
}
