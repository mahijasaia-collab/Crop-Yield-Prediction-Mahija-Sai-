import { Button, Typography, Container, Box } from "@mui/material";

function Home() {
  return (
    <Container maxWidth="lg">

      <Box
        sx={{
          mt: 8,
          textAlign: "center",
        }}
      >

        <Typography
          variant="h2"
          fontWeight="bold"
          color="green"
        >
          🌾 YieldSense AI
        </Typography>

        <Typography
          variant="h5"
          sx={{ mt: 2 }}
        >
          AI Powered Crop Yield Prediction &
          Agricultural Productivity Forecasting
        </Typography>

        <Typography
          sx={{
            mt: 3,
            color: "gray",
          }}
        >
          Predict crop yield using weather,
          soil and rainfall data.
        </Typography>

        <Box
          sx={{
            mt: 5,
          }}
        >

          <Button
            variant="contained"
            sx={{
              mr: 2,
            }}
          >
            Login
          </Button>

          <Button
            variant="outlined"
          >
            Register
          </Button>

        </Box>

      </Box>

    </Container>
  );
}

export default Home;