import { createUser } from "@/api/user.api";
import { UserContext } from "@/context/UserContext";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Container, TextField } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";

export const CreateAccount = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [formInputs, setFormInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      isEmail(formInputs.email) &&
      formInputs.firstname &&
      formInputs.lastname
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formInputs]);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormInputs((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const registerUser = async () => {
    setLoading(true);
    try {
      const res = await createUser(formInputs);
      enqueueSnackbar("Utilisateur créé", { variant: "success" });
      login(res[0]);
      navigate("/");
    } catch (e: any) {
      enqueueSnackbar(e.response.data.error, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigate("/");
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
              variant="outlined"
              fullWidth
            />
            <TextField
              id="lastname"
              label="Nom"
              onChange={(e) => handleInput(e)}
              variant="outlined"
              fullWidth
            />
          </Box>
          <TextField
            id="email"
            label="Email"
            onChange={(e) => handleInput(e)}
            variant="outlined"
            fullWidth
          />
          <LoadingButton
            variant="contained"
            disabled={!isValid}
            onClick={registerUser}
            sx={{ width: "100%" }}
            loading={loading}
          >
            Créer mon compte
          </LoadingButton>
        </Box>
      </Box>
      <Button
        variant="text"
        sx={{ position: "absolute", top: "1rem", left: "1rem" }}
        onClick={goToLogin}
      >
        Retourner à la page de connexion
      </Button>
    </Container>
  );
};
