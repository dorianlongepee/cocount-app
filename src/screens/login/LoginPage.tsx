import { Box, Container, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useContext, useState } from "react";
import isEmail from "validator/lib/isEmail";
import { loginApi } from "@/api/user.api";
import { enqueueSnackbar, VariantType } from "notistack";
import { snackType } from "@/constants";
import { UserContext } from "@/context/UserContext";
import { UserContextType } from "@/types/user";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(UserContext) as UserContextType;

  const handleEmailChange = (e: React.FormEvent<HTMLDivElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setEmail(value);

    if (isEmail(value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const logUser = () => {
    setLoading(true);
    loginApi(email)
      .then((res) => {
        login(res);
      })
      .catch((e) => {
        const variant: VariantType = snackType.ERROR;
        enqueueSnackbar(e.response.data.error, { variant });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container>
      <Box
        sx={{
          height: "100vh",
          maxWidth: "400px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Co'count
        </Typography>
        <TextField
          id="login"
          label="Email *"
          variant="outlined"
          onInput={(e) => handleEmailChange(e)}
          sx={{ width: "100%" }}
        />
        <LoadingButton
          variant="contained"
          disabled={!isValid}
          sx={{ width: "100%" }}
          onClick={logUser}
          loading={loading}
        >
          Se connecter
        </LoadingButton>
      </Box>
    </Container>
  );
};

export default LoginPage;
