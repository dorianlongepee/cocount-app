import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import React, { useContext, useState } from "react";
import isEmail from "validator/lib/isEmail";
import { loginUser } from "@/api/user.api";
import { enqueueSnackbar, VariantType } from "notistack";
import { snackType } from "@/constants";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useContext(UserContext);

  const handleEmailChange = (e: React.FormEvent<HTMLDivElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setEmail(value);

    if (isEmail(value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const goToSignUp = () => {
    navigate("/register");
  };

  const logUser = () => {
    setLoading(true);
    loginUser(email)
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
        <Button variant="text" sx={{ width: "100%" }} onClick={goToSignUp}>
          Créer un compte
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
