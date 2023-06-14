import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useSnackbar } from "notistack";
import * as React from "react";

function SnackbarCloseButton({ snackbarKey }: any) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <ClearIcon color="inherit" />
    </IconButton>
  );
}

export default SnackbarCloseButton;
