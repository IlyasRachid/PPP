import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";

function refreshMessages() {
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

  return Array.from(new Array(50)).map(
    () => messageExamples[getRandomInt(messageExamples.length)]
  );
}

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);
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
                height: "60px",
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                textAlign: "center",
              }}
            >
              <Avatar alt="Profile Picture" src={team1 || ""} />
              <ListItemText primary={title} secondary={date} />
              <Avatar alt="Profile Picture" src={team2 || ""} />
            </Box>
          </ListItemButton>
        ))}
      </List>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: "15%", right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{ width: "100%", justifyContent: "space-around" }}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Current" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Favourite" icon={<ArchiveIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

const messageExamples = [
  {
    title: "Real Madrid Vs Barcelona",
    date: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    team1: "/static/images/avatar/5.jpg",
    team2: "/static/images/avatar/5.jpg",
  },
  {
    title: "Bayern Munich Vs Borussia Dortmund",
    date: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    team1: "/static/images/avatar/5.jpg",
    team2: "/static/images/avatar/5.jpg",
  },
  {
    title: "Manchester United Vs Manchester City",
    date: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    team1: "/static/images/avatar/5.jpg",
    team2: "/static/images/avatar/5.jpg",
  },
  {
    title: "Chelsea Vs Arsenal",
    date: "",
    team1: "/static/images/avatar/5.jpg",
    team2: "/static/images/avatar/5.jpg",
  },
];
