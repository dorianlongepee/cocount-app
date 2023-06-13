import { Snackbar } from "@mui/material";
import { useState } from "react";
import { snackType } from "@/constants";

function SnackbarHOC<T>(
  WrappedComponent: React.ComponentType<T>,
  Alert: React.ComponentType<any>
) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("I'm a custom snackbar");
  const [duration, setDuration] = useState(2000);
  const [severity, setSeverity] = useState(snackType.SUCCESS);

  return (props: T) => {
    const showMessage = (
      message: string,
      severity: snackType,
      duration = 2000
    ) => {
      setMessage(message);
      setSeverity(severity);
      setDuration(duration);
      setOpen(true);
    };

    const handleClose = (
      event: React.SyntheticEvent | Event,
      reason?: string
    ) => {
      if (reason === "clickaway") {
        return;
      }
    };

    return (
      <>
        <WrappedComponent {...props} snackbarShowMessage={showMessage} />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          autoHideDuration={duration}
          open={open}
          onClose={handleClose}
        >
          <Alert severity={severity} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </>
    );
  };
}

export default SnackbarHOC;
