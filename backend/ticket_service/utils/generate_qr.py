import json
import qrcode

# Charger les tickets depuis le fichier JSON
def load_tickets(file_path):
    with open(file_path, "r") as file:
        return json.load(file)

# Générer un QR code pour un ticket spécifique
def generate_qr(ticket_id, tickets, output_folder="."):
    # Rechercher le ticket correspondant à l'ID
    ticket = next((t for t in tickets if t["_id"] == ticket_id), None)
    if ticket:
        qr_data = json.dumps(ticket)  # Convertir les données du ticket en JSON
        qr = qrcode.make(qr_data)    # Générer le QR code
        output_path = f"{output_folder}/{ticket_id}_qr.png"
        qr.save(output_path)         # Sauvegarder le QR code dans un fichier
        print(f"QR Code généré pour {ticket_id} et sauvegardé sous {output_path}.")
    else:
        print(f"Ticket avec ID {ticket_id} introuvable.")

if __name__ == "__main__":
    # Chemin vers le fichier JSON contenant les tickets
    json_file_path = "c:\\Users\\NOREDINE\\Desktop\\project\\tickets.json"

    # Charger les tickets
    tickets = load_tickets(json_file_path)

    # Demander l'ID du ticket à l'utilisateur
    ticket_id = input("Entrez l'ID du ticket pour générer le QR code : ")

    # Générer le QR code
    generate_qr(ticket_id, tickets)
