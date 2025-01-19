import cv2
import json
from pymongo import MongoClient
import time
import winsound  # Pour Windows
# import os  # Pour macOS/Linux

# Connexion à MongoDB
def connect_to_mongodb(uri, db_name):
    client = MongoClient(uri)  # Se connecter à MongoDB
    db = client[db_name]  # Sélectionner la base de données
    return db

# Mettre à jour le statut d'un ticket spécifique
def update_ticket_status(ticket_id, tickets_collection):
    ticket = tickets_collection.find_one({"_id": ticket_id})  # Rechercher le ticket par ID
    if ticket:
        if ticket["status"] == "valide":
            tickets_collection.update_one({"_id": ticket_id}, {"$set": {"status": "utilisé"}})  # Mettre à jour le statut
            print(f"Statut du ticket {ticket_id} mis à jour en 'utilisé'.")
            return True
        else:
            print(f"Le ticket {ticket_id} est déjà 'utilisé' ou invalide.")
            return False
    else:
        print(f"Ticket avec ID {ticket_id} introuvable.")
        return False

# Émettre un son
def play_sound(success):
    if success:
        # Son pour un scan réussi (Windows)
        winsound.Beep(1000, 500)  # Fréquence = 1000 Hz, Durée = 500 ms
        # Pour macOS/Linux
        # os.system("afplay /System/Library/Sounds/Ping.aiff")  # Chemin vers un fichier son
    else:
        # Son pour un scan échoué (Windows)
        winsound.Beep(200, 1000)  # Fréquence = 200 Hz, Durée = 1000 ms
        # Pour macOS/Linux
        # os.system("afplay /System/Library/Sounds/Basso.aiff")  # Chemin vers un fichier son

# Scanner le QR code et valider le ticket
def scan_and_validate(tickets_collection, match_id):
    cap = cv2.VideoCapture(0)  # Ouvrir la caméra
    qr_detector = cv2.QRCodeDetector()  # Initialiser le détecteur de QR code
    print("Scanner démarré. Appuyez sur 'q' pour quitter.")
    last_scan_time = 0  # Temps du dernier scan réussi

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Erreur lors de la capture de l'image.")
            break

        # Détecter et décoder le QR code
        decoded_data, points, _ = qr_detector.detectAndDecode(frame)

        if decoded_data:
            try:
                qr_data = json.loads(decoded_data)  # Décoder les données du QR
                ticket_id = qr_data.get("_id")

                # Vérifier si 1 seconde s'est écoulée depuis le dernier scan
                current_time = time.time()
                if current_time - last_scan_time >= 1:
                    # Vérifier si le ticket appartient au match sélectionné
                    ticket = tickets_collection.find_one({"_id": ticket_id, "match_id": match_id})
                    if ticket:
                        # Rechercher le ticket dans MongoDB et valider
                        if update_ticket_status(ticket_id, tickets_collection):
                            print(f"Ticket {ticket_id} validé avec succès pour le match {qr_data['match']}.")
                            play_sound(True)  # Émettre un son de succès
                            last_scan_time = current_time  # Mettre à jour le temps du dernier scan
                        else:
                            print(f"Validation échouée pour le ticket {ticket_id}.")
                            play_sound(False)  # Émettre un son d'échec
                            last_scan_time = current_time  # Mettre à jour le temps du dernier scan
                    else:
                        print(f"Le ticket {ticket_id} n'appartient pas au match sélectionné.")
                        play_sound(False)  # Émettre un son d'échec
                        last_scan_time = current_time  # Mettre à jour le temps du dernier scan
                else:
                    print("Veuillez attendre 1 seconde avant de scanner à nouveau.")
            except json.JSONDecodeError:
                print("Données QR code invalides.")
        
        # Afficher l'image avec OpenCV
        if points is not None:
            points = points[0].astype(int)
            for i in range(4):
                cv2.line(frame, tuple(points[i]), tuple(points[(i + 1) % 4]), (0, 255, 0), 2)
            cv2.putText(frame, decoded_data, (points[0][0], points[0][1] - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        cv2.imshow("Scanner QR", frame)

        # Quitter si 'q' est pressé
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    # Configuration MongoDB
    MONGO_URI = "mongodb://localhost:27017"  # URI de connexion à MongoDB
    DB_NAME = "tickets_db"  # Nom de la base de données

    # Se connecter à MongoDB
    db = connect_to_mongodb(MONGO_URI, DB_NAME)

    # Demander à l'utilisateur de saisir l'ID du match
    match_id = input("Entrez l'ID du match : ")

    # Vérifier si le match existe
    matches_collection = db["matches"]
    match = matches_collection.find_one({"_id": match_id})
    if not match:
        print(f"Match avec ID {match_id} introuvable.")
        exit()

    # Afficher les informations du match
    print(f"Match sélectionné : {match['match']}")
    print(f"Date : {match['date']}")
    print(f"Heure : {match['time']}")
    print(f"Stade : {match['stadium']}")

    # Filtrer les tickets pour le match sélectionné
    tickets_collection = db["tickets"]
    match_tickets = tickets_collection.find({"match_id": match_id})

    # Vérifier s'il y a des tickets pour ce match
    if tickets_collection.count_documents({"match_id": match_id}) == 0:
        print(f"Aucun ticket trouvé pour le match {match_id}.")
        exit()

    # Scanner et valider les tickets
    scan_and_validate(tickets_collection, match_id)