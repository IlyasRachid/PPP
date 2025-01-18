import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";

// Import the JSON data (assuming it's in the same directory)
import matchesData from "../Data/matches.json";

function refreshMessages() {
  // Use the matches data directly from the JSON file
  return matchesData.matches.map((match) => ({
    title: `${match.team1} vs ${match.team2}`,
    date: `${match.date} at ${match.time}`,
    team1: match.team1Image,
    team2: match.team2Image,
  }));
}

export default function FixedBottomNavigation() {
  const value = 0;
  const ref = React.useRef(null);
  const [messages, setMessages] = React.useState(() => refreshMessages());

  React.useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
    setMessages(refreshMessages());
  }, [value, setMessages]);

  return (
    <Box
      sx={{
        pb: 7,
        width: "100%",
        mb: 0,
      }}
      ref={ref}
    >
      <CssBaseline />
      <Typography
        variant="h2"
        component="h2"
        sx={{ color: "text.primary", textAlign: "center", mb: 5, mt: 2 }}
      >
        Matches
      </Typography>
      <List sx={{ width: "100%" }}>
        {messages.map(({ title, date, team1, team2 }, index) => (
          <ListItemButton key={index}>
            <Box
              sx={{
                width: "100%",
                height: "150px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                textAlign: "center",
                backgroundColor: "background.paper",
                pl: 10,
                pr: 10,
                borderRadius: 1,
                ":hover": {
                  boxShadow: 1,
                  borderRadius: 1,
                  backgroundColor: "background.default",
                },
              }}
            >
              <Avatar
                alt={team1}
                src={team1}
                sx={{
                  width: "120px",
                  height: "80px",
                  "& img": {
                    objectFit: "contain",
                  },
                }}
              />
              <ListItemText
                primary={title}
                secondary={date}
                sx={{
                  width: "100%",
                  textAlign: "center",
                  "& .MuiListItemText-primary": {
                    fontSize: "1rem",
                    marginBottom: "0.3rem",
                    fontFamily: "Roboto",
                  },
                  "& .MuiListItemText-secondary": {
                    fontSize: "1rem",
                  },
                }}
              />
              <Avatar
                alt={team2}
                src={team2}
                sx={{
                  width: "120px", // Largeur personnalisée
                  height: "80px", // Hauteur personnalisée
                  "& img": {
                    objectFit: "contain", // Affiche toute l'image sans la recadrer
                  },
                }}
              />
            </Box>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
