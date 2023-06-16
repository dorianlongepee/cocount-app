import { ArrowBack } from "@mui/icons-material";
import { IconButton, Toolbar, Typography } from "@mui/material";

interface props {
  title?: string;
  goBack?: boolean;
}

export const Header = ({ title, goBack }: props) => {
  return (
    <Toolbar>
      <IconButton
        aria-label="go-back"
        onClick={() => window.history.back()}
        sx={{ display: goBack ? "block" : "none" }}
      >
        <ArrowBack />
      </IconButton>
      <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
        {title ? title : "Co'Count"}
      </Typography>
    </Toolbar>
  );
};
