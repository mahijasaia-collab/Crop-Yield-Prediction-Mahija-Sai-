import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box
} from "@mui/material";

function Login() {
  return (
    <Container maxWidth="sm">

      <Paper
        elevation={6}
        sx={{
          mt: 10,
          p: 4,
          borderRadius: 3
        }}
      >

        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          color="green"
        >
          🌾 YieldSense AI
        </Typography>

        <Typography
          align="center"
          sx={{ mt: 1, mb: 3 }}
        >
          Login to continue
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="normal"
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            py: 1.5
          }}
        >
          Login
        </Button>

      </Paper>

    </Container>
  );
}

export default Login;