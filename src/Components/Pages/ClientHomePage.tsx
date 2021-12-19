import React, { Component, useState } from 'react';
import UserInfo from './Views/UserInfoView';
import { Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';

export interface UserInformation {
    name: string,
    email: string,
    DOB: string,
    handleChange: (input: any) => any,
}

export class ClientHomePage extends Component<{ signOut: () => void }> {
    state = {
        name: 'Ashwath',
        email: 'vaashwath@gmail.com',
        DOB: '21-07-2021'
    }

    handleChange = (input: any) => (event: any) => {
        this.setState({ [input]: event.target.value });
    }

    handleNavigation = (target: string) => () => {
        const navigate = useNavigate();
        navigate(target);
    }    

    render() {
        const { name, email, DOB } = this.state;
        return (
            <div>
                    <div style={{
                        float:"right",
                    }}>
                        <Button color="primary" onClick={this.props.signOut}>Sign out</Button>
                    </div>
                
                <UserInfo name={name} email={email} DOB={DOB} handleChange={this.handleChange} />                
                <Button style=
                    {{display: "flex", marginTop:"10px"}} 
                     color="primary" variant="contained" component={Link} to='/filing'>
                    Start Filing
                </Button>
            </div>
        ) 
    }
}

export default ClientHomePage
