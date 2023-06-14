import { Avatar, Box, Stack, TextField, Typography } from "@mui/material";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export const Settings = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Stack
        sx={{
          margin: "1rem 0",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: ".5rem",
          }}
        >
          <Avatar />
          <Typography>John Doe</Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <TextField
              id="firstname"
              label="Prénom"
              value={user.firstname}
              variant="outlined"
              fullWidth
            />
            <TextField
              id="lastname"
              label="Nom"
              value={user.lastname}
              variant="outlined"
              fullWidth
            />
          </Box>
          <TextField
            id="email"
            label="Email"
            value={user.email}
            variant="outlined"
            fullWidth
          />
        </Box>
      </Stack>
    </>
  );
};
