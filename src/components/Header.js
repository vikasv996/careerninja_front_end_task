import React from 'react';
import axios from 'axios';
import { LIST_ROUTE } from "../config/routeConfig";
import SnackbarUtil from "../utils/SnackbarUtil";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const debug = true;

class Header extends React.Component {

    state = {
        loading: false,
        error: false,
        list: [],
        snackbarOpen: false,
        snackbarMessage: '',
    };

    handleSnackBarClick = () => {
        this.setState((prevState) => ({
            snackbarOpen: !prevState.snackbarOpen
        }));
    };

    listBattles = () => {
        if (!navigator.onLine) {
            if (debug) console.log("Offline: Not connected");
            this.setState(prevState => ({
                snackbarOpen: !prevState.snackbarOpen,
                snackbarMessage: "Network disconnected. You are offline",
                // pageNum: 0,
                // maxPage: 1,
                loading: false,
                error: true
            }))
        } else {
            if (debug) console.log("Online: Connected to internet");
            this.setState(() => ({ loading: true }));
            axios.get(LIST_ROUTE, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
                .then(res => {
                    if (debug) console.log("Response: war-list", res);
                    if (res.data) {
                        if (res.data.code === 100) {
                            this.setState(() => ({
                                // noEntity: false,
                                loading: false,
                                error: false,
                                // totalCount: res.data.totalCount,
                                list: res.data.locations,
                                // maxPage: this.maxPage(res.data.totalCount)
                            }))
                        } else {
                            this.setState(() => ({ noEntity: true, loading: false, error: false }));
                        }
                    } else {
                        this.setState(() => ({ loading: false, error: true }));
                    }
                })
                .catch((err) => {
                    if (debug) console.log("Error: war-list", err);
                    this.setState(() => ({
                        loading: false,
                        error: true,
                        snackbarOpen: true,
                        snackbarMessage: 'Server error. Please try after some time'
                    }));
                });
        }
    };

    componentDidMount() {
        this.listBattles();
    }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6">
                            Game of Thrones
                        </Typography>
                    </Toolbar>
                </AppBar>
                <SnackbarUtil
                    handleSnackBarClick={this.handleSnackBarClick}
                    snackbarOpen={this.state.snackbarOpen}
                    snackbarMessage={this.state.snackbarMessage}
                />
            </div>
        );
    }
}

export default Header;
