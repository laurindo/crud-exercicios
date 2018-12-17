import React from 'react';
import axios from 'axios';

export default class Accounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/accounts')
            .then(result => {
                this.setState({
                    accounts: result.data
                })
            })
            .catch(error => {
                console.log(error);
            });
    }

    renderAccounts() {
        return this.state.accounts.map((account, index) => {
            return (
                <li key={index}>{account.name}</li>
            );
        });
    }

    render() {
        return (
            <div>
                <h1>Accounts</h1>
                <ul>
                    {this.renderAccounts()}
                </ul>
            </div>
        );
    }
}