import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppTheme from "../shared-theme/AppTheme";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "../theme/customizations";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button"; // Import du composant Button
import { useLocation } from "react-router-dom"; // Import de useLocation

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props) {
  const location = useLocation(); // Récupérer les données passées via navigate
  const matchData = location.state; // Données du match sélectionné

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            {/* Section pour afficher les détails du match sélectionné */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                width: "100%",
                maxWidth: 1000, // Augmenter la largeur maximale
                mx: "auto",
                p: 3,
                backgroundColor: "background.paper",
                borderRadius: 2,
                boxShadow: 1,
                marginTop: "30vh", // Ajuster pour centrer un peu plus bas
                height: "70vh",
              }}
            >
              {matchData ? ( // Vérifier si des données de match sont disponibles
                <>
                  <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                    {matchData.team1} vs {matchData.team2}
                  </Typography>
                  <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
                    {matchData.date}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 8, // Augmenter l'espacement entre les équipes
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Avatar
                        alt={matchData.team1}
                        src={matchData.team1Image}
                        sx={{
                          width: 120,
                          height: 80,
                          "& img": {
                            objectFit: "contain",
                          },
                        }}
                      />
                      <Typography variant="h6">{matchData.team1}</Typography>
                    </Box>
                    <Typography variant="h4" component="span">
                      VS
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Avatar
                        alt={matchData.team2}
                        src={matchData.team2Image}
                        sx={{
                          width: 120,
                          height: 80,
                          "& img": {
                            objectFit: "contain",
                          },
                        }}
                      />
                      <Typography variant="h6">{matchData.team2}</Typography>
                    </Box>
                  </Box>
                  {/* Boutons pour regarder le match et acheter les tickets */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      mt: 4,
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        width: 200,
                        px: 4,
                        py: 1.5,
                        fontSize: "1rem",
                        fontWeight: "bold",
                      }}
                    >
                      Watch live
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{
                        width: 200,
                        px: 4,
                        py: 1.5,
                        fontSize: "1rem",
                        fontWeight: "bold",
                      }}
                    >
                      Buy your ticket
                    </Button>
                  </Box>
                </>
              ) : (
                // Afficher un message si aucun match n'est sélectionné
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  Aucun match sélectionné
                </Typography>
              )}
            </Box>
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
