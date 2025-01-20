import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import {
  Page,
  Text,
  View,
  Document,
  PDFDownloadLink,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import AppTheme from "../shared-theme/AppTheme";
import ColorModeIconDropdown from "../shared-theme/ColorModeIconDropdown";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom"; // Import de useLocation et Navigate

// PDF styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
    backgroundColor: "#f7f7f7",
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#3f51b5",
  },
  section: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    border: "1px solid #e0e0e0",
  },
  label: {
    fontWeight: "bold",
    color: "#3f51b5",
    marginBottom: 5,
  },
  value: {
    color: "#333333",
  },
  qrCodeContainer: {
    marginTop: 20,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    border: "1px solid #e0e0e0",
  },
  ticketId: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#3f51b5",
    textAlign: "center",
    marginBottom: 20,
  },
});

// PDF Document Component
const TicketDocument = ({ ticket, qrCodeUrl }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Match Ticket</Text>
      <Text style={styles.ticketId}>Ticket ID: {ticket._id}</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Match:</Text>
        <Text style={styles.value}>{ticket.match}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{ticket.date}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>{ticket.time}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Stadium:</Text>
        <Text style={styles.value}>{ticket.stadium}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Seat:</Text>
        <Text style={styles.value}>{ticket.seat}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>${ticket.price.toFixed(2)}</Text>
      </View>
      <View style={styles.qrCodeContainer}>
        <Text style={styles.label}>QR Code:</Text>
        <Image src={qrCodeUrl} style={{ width: 100, height: 100 }} />
      </View>
    </Page>
  </Document>
);

// Définir les propTypes pour TicketDocument
TicketDocument.propTypes = {
  ticket: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    match_id: PropTypes.string.isRequired,
    match: PropTypes.string.isRequired, // Validation pour match
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    stadium: PropTypes.string.isRequired,
    seat: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  qrCodeUrl: PropTypes.string.isRequired, // Validation pour l'URL du QR Code
};

// Main Component
const TicketDownloadPage = (props) => {
  const location = useLocation(); // Récupérer les données passées via navigate
  const matchData = location.state; // Données du match sélectionné

  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    if (matchData) {
      // Générer le QR Code en base64 avec les données du match
      QRCode.toDataURL(JSON.stringify(matchData))
        .then((url) => setQrCodeUrl(url))
        .catch((err) => console.error(err));
    }
  }, [matchData]);

  if (!matchData) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6">
          No match data found. Please select a match first.
        </Typography>
      </Box>
    );
  }

  // Créer un objet ticketData basé sur matchData
  const ticketData = {
    _id: "ticket1", // Vous pouvez générer un ID unique ici
    match_id: matchData.matchId, // Utiliser l'ID du match
    match: `${matchData.team1} vs ${matchData.team2}`, // Nom du match
    date: matchData.date.split(" at ")[0], // Extraire la date
    time: matchData.date.split(" at ")[1], // Extraire l'heure
    stadium: "Stadium Alpha", // Vous pouvez remplacer par le stade réel
    seat: "Section A, Row 5, Seat 10", // Vous pouvez remplacer par le siège réel
    price: 50.0, // Vous pouvez remplacer par le prix réel
    status: "valide",
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ position: "fixed", top: "1rem", right: "1rem" }}>
        <ColorModeIconDropdown />
      </Box>

      <Grid
        container
        sx={{
          height: {
            xs: "100%",
            sm: "calc(100dvh - var(--template-frame-height, 0px))",
          },
          mt: {
            xs: 4,
            sm: 0,
          },
        }}
      >
        <Grid
          size={{ xs: 12, sm: 5, lg: 4 }}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            backgroundColor: "background.paper",
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "start",
            pt: 16,
            px: 10,
            gap: 4,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Ticket Details
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: 500,
            }}
          >
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Match:</strong> {ticketData.match}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Date:</strong> {ticketData.date}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Time:</strong> {ticketData.time}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Stadium:</strong> {ticketData.stadium}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Seat:</strong> {ticketData.seat}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Price:</strong> ${ticketData.price.toFixed(2)}
            </Typography>
          </Box>
        </Grid>
        <Grid
          size={{ sm: 12, md: 7, lg: 8 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            alignItems: "center",
            pt: { xs: 0, sm: 16 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          {/* Titre de la section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: { sm: "space-between", md: "center" },
              alignItems: "center",
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
              mb: 4,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                alignItems: "center",
                color: "primary.main",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              Download Your Ticket
            </Typography>
          </Box>

          {/* Carte pour les écrans mobiles */}
          <Card
            sx={{
              display: { xs: "flex", md: "none" },
              width: "100%",
              backgroundColor: "background.paper",
              boxShadow: 3,
              borderRadius: 2,
              mb: 4,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
              }}
            >
              <div>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  sx={{ color: "text.secondary" }}
                >
                  Selected Ticket
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "text.primary" }}
                >
                  {ticketData.match} - ${ticketData.price.toFixed(2)}
                </Typography>
              </div>
            </CardContent>
          </Card>

          {/* Contenu principal (QR Code et bouton de téléchargement) */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
              maxHeight: "720px",
              marginBottom: "50px",
              gap: { xs: 5, md: "none" },
              backgroundColor: { xs: "transparent", sm: "background.paper" },
              p: 4,
              borderRadius: 2,
              boxShadow: { xs: 0, sm: 3 },
            }}
          >
            {/* Section du QR Code */}
            <Box
              sx={{
                textAlign: "center",
                mt: 4,
                p: 3,
                backgroundColor: "background.default",
                borderRadius: 2,
                boxShadow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: "bold",
                  color: "primary.main",
                }}
              >
                Scan QR Code for Ticket Details
              </Typography>
              {qrCodeUrl && (
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  style={{
                    width: 128,
                    height: 128,
                    borderRadius: "8px",
                    border: "2px solid #3f51b5",
                  }}
                />
              )}
            </Box>

            {/* Bouton de téléchargement */}
            {qrCodeUrl && (
              <Box
                sx={{
                  mt: 4,
                  textAlign: "center",
                }}
              >
                <PDFDownloadLink
                  document={
                    <TicketDocument ticket={ticketData} qrCodeUrl={qrCodeUrl} />
                  }
                  fileName={`${ticketData.match.replace(" ", "_")}_ticket.pdf`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  {({ loading }) => (
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        backgroundColor: "primary.main",
                        color: "white",
                        "&:hover": { backgroundColor: "primary.dark" },
                        px: 6,
                        py: 2,
                        fontSize: "1rem",
                        fontWeight: "bold",
                        borderRadius: "8px",
                        boxShadow: 2,
                        transition: "all 0.3s ease",
                      }}
                    >
                      {loading ? "Generating Ticket..." : "Download Ticket"}
                    </Button>
                  )}
                </PDFDownloadLink>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </AppTheme>
  );
};

export default TicketDownloadPage;
