import React from 'react';
import '../App.css';
// import { isLoggedIn } from "../utils/GenUtils";
// import Panel from "./Panel";
// import Register from "./Register";
import SnackbarUtil from "../utils/SnackbarUtil";
import SearchBar from "./SearchBar";
import Header from "./Header";

class App extends React.Component {

    state = {
        loginPage: true,
        snackbarOpen: false,
        snackbarMessage: ""
    };

    handleSnackBarClick = () => {
        this.setState((prevState) => ({
            snackbarOpen: !prevState.snackbarOpen
        }));
    };

    showSnackbar = (message) => {
        this.setState((prevState) => ({
            snackbarOpen: !prevState.snackbarOpen,
            snackbarMessage: message
        }));
    };

    handlePageChange = (page) => {
        this.setState(() => ({
            loginPage: page === "login"
        }))
    };

    render() {
        return (
            <div>
                <Header/>
                <SearchBar/>
                <SnackbarUtil
                    handleSnackBarClick={this.handleSnackBarClick}
                    snackbarOpen={this.state.snackbarOpen}
                    snackbarMessage={this.state.snackbarMessage}
                    // page="login"
                />
            </div>
        );
    }
}

export default App;
