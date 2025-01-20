import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import matchesData from "../Data/matches.json";
import CustomDatePicker from "./CustomDatePicker";
import Search from "./Search"; // Import the Search component

function refreshMessages() {
  return matchesData.matches.map((match, index) => ({
    id: index,
    title: `${match.team1} vs ${match.team2}`,
    date: `${match.date} at ${match.time}`,
    team1: match.team1Image,
    team2: match.team2Image,
    team1Name: match.team1,
    team2Name: match.team2,
  }));
}

export default function FixedBottomNavigation() {
  const navigate = useNavigate();
  const [messages] = React.useState(() => refreshMessages());
  const [selectedDate, setSelectedDate] = React.useState(null); // State for selected date
  const [searchQuery, setSearchQuery] = React.useState(""); // State for search query

  // Filter matches based on the selected date and search query
  const filteredMessages = messages.filter((message) => {
    const matchDate = dayjs(message.date.split(" at ")[0]); // Extract date part
    const matchesDate = selectedDate
      ? matchDate.isSame(selectedDate, "day")
      : true;
    const matchesSearch = message.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesDate && matchesSearch;
  });

  return (
    <Box
      sx={{
        pb: 7,
        width: "100%",
        mb: 0,
      }}
    >
      <CssBaseline />
      <Typography
        variant="h2"
        component="h2"
        sx={{ color: "text.primary", textAlign: "center", mb: 5, mt: 2 }}
      >
        Matches
      </Typography>
      {/* Add the Search and CustomDatePicker */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
        <Search
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
        <CustomDatePicker
          onDateChange={(date) => setSelectedDate(date)} // Update selected date
        />
      </Box>
      <List sx={{ width: "100%" }}>
        {filteredMessages.map(
          ({ id, title, date, team1, team2, team1Name, team2Name }) => (
            <ListItemButton
              key={id}
              onClick={() =>
                navigate("/matches", {
                  state: {
                    matchId: id,
                    team1: team1Name,
                    team2: team2Name,
                    team1Image: team1,
                    team2Image: team2,
                    date: date,
                  },
                })
              }
            >
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
                  alt={team1Name}
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
                  alt={team2Name}
                  src={team2}
                  sx={{
                    width: "120px",
                    height: "80px",
                    "& img": {
                      objectFit: "contain",
                    },
                  }}
                />
              </Box>
            </ListItemButton>
          )
        )}
      </List>
    </Box>
  );
}
