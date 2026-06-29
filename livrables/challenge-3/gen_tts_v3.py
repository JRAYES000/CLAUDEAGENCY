from gtts import gTTS
from pathlib import Path

out = Path(__file__).parent / "voix_off_v3_nouvelle_section.mp3"
log = Path(__file__).parent / "tts_v3_log.txt"

text = (
    "Concretement : sur Google, vous etes en premiere page avant vos concurrents. "
    "Sur la publicite, chaque euro est suivi. "
    "Sur Qualiopi, vos preuves sont a jour chaque mois. Votre audit sera serein. "
    "Et votre site devient un outil commercial qui genere de vraies demandes. "
    "Reservez votre audit gratuit de 30 minutes sur claudeagency.fr. "
    "Vous repartez avec une feuille de route claire, sans engagement. "
    "Les creneaux sont limites ce mois-ci."
)

try:
    tts = gTTS(text=text, lang="fr", slow=False)
    tts.save(str(out))
    log.write_text(f"OK: {out.stat().st_size // 1024} KB")
except Exception as e:
    log.write_text(f"ERREUR: {e}")
