import {
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { UserContext } from "@/context/UserContext";
import { useContext, useEffect, useState } from "react";
import { isEqual, cloneDeep } from "lodash";
import { LoadingButton } from "@mui/lab";
import { VariantType, enqueueSnackbar } from "notistack";
import { snackType } from "@/constants";
import { updateUserInfos } from "@/api/user.api";
import { revalidate } from "@/api/fetcher";
import { useNavigate } from "react-router-dom";

export const Settings = () => {
  const { user, login, logout } = useContext(UserContext);
  const [formInputs, setFormInputs] = useState(cloneDeep(user));
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      !isEqual(formInputs, user) &&
      formInputs.firstname &&
      formInputs.lastname &&
      formInputs.email
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formInputs, user]);

  const displayName = `${user.firstname} ${user.lastname}`;

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormInputs((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const updateUser = async () => {
    setLoading(true);
    try {
      await updateUserInfos(user._id, formInputs);
      revalidate("expenses");
      const variant: VariantType = snackType.SUCCESS;
      enqueueSnackbar("Informations mises à jour", { variant });
    } catch (e: any) {
      const variant: VariantType = snackType.ERROR;
      enqueueSnackbar(e.response.data.error, { variant });
      return;
    } finally {
      setLoading(false);
    }
    login(formInputs);
  };

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        height: "100%",
      }}
    >
      <Button variant="contained" onClick={() => navigate("/categories")}>
        Gérer les catégories
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: ".5rem",
        }}
      >
        <Avatar />
        <Typography>{displayName}</Typography>
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
            onChange={(e) => handleInput(e)}
            defaultValue={formInputs.firstname}
            variant="outlined"
            fullWidth
          />
          <TextField
            id="lastname"
            label="Nom"
            onChange={(e) => handleInput(e)}
            value={formInputs.lastname}
            variant="outlined"
            fullWidth
          />
        </Box>
        <TextField
          id="email"
          label="Email"
          onChange={(e) => handleInput(e)}
          value={formInputs.email}
          variant="outlined"
          fullWidth
        />
        <LoadingButton
          variant="contained"
          disabled={!isValid}
          onClick={updateUser}
          sx={{ width: "100%" }}
          loading={loading}
        >
          Modifier mes informations
        </LoadingButton>
      </Box>
      <Box sx={{ display: "flex", flexGrow: 1 }}></Box>
      <Box sx={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
        <Button
          variant="outlined"
          color="warning"
          sx={{ width: "100%" }}
          onClick={logout}
        >
          Se déconnecter
        </Button>
      </Box>
    </Stack>
  );
};
