import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { Box, Container, Grid } from "@mui/material";
import PostCard from "../components/PostCard";

function Home() {
  return (
    <>
      <Box sx={{ bgcolor: "afafafa", minHeight: "100vh" }}>
        <Navbar />

        <Container sx={{ pt: 5, pb: 5, minHeight: "83vh" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              column={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={2} sm={4} md={4}>
                <PostCard />
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Footer />
      </Box>
    </>
  );
}

export default Home;
