import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import '../styles/snackbarStyle.css';

// import Button from "@material-ui/core/es/Button/Button";

class SnackbarUtil extends React.Component {

    render() {
        let snackbarStyle = "";
        switch (this.props.page) {
            case "login":
                snackbarStyle = "";
                break;
            default:
                snackbarStyle = "snackbar-style";
                break;
        }
        return (
            <Snackbar
                className={snackbarStyle}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={this.props.handleSnackBarClick}
                open={this.props.snackbarOpen}
                autoHideDuration={2000}
                // className={this.props.page === 'comments' ? "" : "snackbar-style"}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.props.snackbarMessage}</span>}
                // action={
                //   <Button
                //       onClick={this.props.handleSnackBarClick}
                //       color="inherit"
                //       style={{fontWeight: 'bolder'}}
                //       size="small">
                //     Close
                //   </Button>
                // }
            />
        );
    }
}

export default SnackbarUtil;
