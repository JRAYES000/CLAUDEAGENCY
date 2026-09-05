#!/usr/bin/env python3
"""Génère le modèle vierge de feuille d'émargement, à la charte Claude Agency.

Une page A4 paysage : en-tête de session à remplir, tableau stagiaires x
demi-journées (3 jours), bloc formateur. Prêt à imprimer et à signer.

Sortie : app/public/ressources/modele-feuille-emargement.pdf
Lancer depuis app/ :  python scripts/generate-modele-emargement-pdf.py
"""
import os
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.units import cm
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image

# Palette (charte du site, identique à generate-lead-magnet-pdf.py)
BRAND = HexColor("#CC785C")
INK = HexColor("#2B2A28")
MUTED = HexColor("#6E665C")
CREAM = HexColor("#FBF8F2")
SAND = HexColor("#E7DECF")

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "public", "ressources", "modele-feuille-emargement.pdf"))
os.makedirs(os.path.dirname(OUT), exist_ok=True)
LOGO = os.path.join(HERE, "logo-spark-cream.png")

PAGE = landscape(A4)
MARGIN = 1.5 * cm
CONTENT_W = PAGE[0] - 2 * MARGIN

JOURS = 3          # 3 journées, soit 6 colonnes de signature
LIGNES = 11        # lignes stagiaires vierges

styles = {
    "h_title": ParagraphStyle("h_title", fontName="Times-Bold", fontSize=17, leading=20, textColor=white),
    "champ": ParagraphStyle("champ", fontName="Times-Roman", fontSize=9.5, leading=15, textColor=INK),
    "th": ParagraphStyle("th", fontName="Times-Bold", fontSize=9, leading=11, textColor=INK, alignment=1),
    "th_l": ParagraphStyle("th_l", fontName="Times-Bold", fontSize=9, leading=11, textColor=INK),
    "note": ParagraphStyle("note", fontName="Times-Italic", fontSize=8, leading=11, textColor=MUTED),
}

POINTILLES = "." * 60


def bandeau():
    logo = Image(LOGO, width=1.0 * cm, height=1.0 * cm)
    t = Table([[logo, Paragraph("Feuille d'émargement", styles["h_title"])]],
              colWidths=[1.5 * cm, CONTENT_W - 1.5 * cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), BRAND),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (0, 0), 14),
        ("LEFTPADDING", (1, 0), (1, 0), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 14),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("ROUNDEDCORNERS", [8, 8, 8, 8]),
    ]))
    return t


def champs_session():
    """En-tête à remplir : les mentions qu'un financeur attend."""
    lignes = [
        ["Intitulé de la formation :", "Lieu (ou « à distance ») :"],
        ["Organisme de formation :", "Formateur :"],
        ["N° de déclaration d'activité :", "Durée totale de la session :"],
    ]
    data = [[Paragraph(f"<b>{g}</b> {POINTILLES}", styles["champ"]),
             Paragraph(f"<b>{d}</b> {POINTILLES}", styles["champ"])] for g, d in lignes]
    t = Table(data, colWidths=[CONTENT_W * 0.55, CONTENT_W * 0.45])
    t.setStyle(TableStyle([
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
    ]))
    return t


def tableau_emargement():
    col_nom = 6.5 * cm
    col_sig = (CONTENT_W - col_nom) / (JOURS * 2)

    entete_j = [Paragraph("Nom et prénom du stagiaire", styles["th_l"])]
    for j in range(JOURS):
        entete_j += [Paragraph(f"Jour {j + 1} — date : ................", styles["th"]), ""]
    entete_dj = [""]
    for _ in range(JOURS):
        entete_dj += [Paragraph("Matin", styles["th"]), Paragraph("Après-midi", styles["th"])]

    data = [entete_j, entete_dj] + [[""] * (1 + JOURS * 2) for _ in range(LIGNES)]
    t = Table(data, colWidths=[col_nom] + [col_sig] * (JOURS * 2),
              rowHeights=[0.75 * cm, 0.6 * cm] + [0.83 * cm] * LIGNES, repeatRows=2)

    style = [
        ("GRID", (0, 0), (-1, -1), 0.6, SAND),
        ("BOX", (0, 0), (-1, -1), 1, BRAND),
        ("BACKGROUND", (0, 0), (-1, 1), CREAM),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("SPAN", (0, 0), (0, 1)),
        ("LEFTPADDING", (0, 0), (0, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
        # trait plus marqué entre deux journées, pour ne pas signer dans la mauvaise colonne
        ("LINEAFTER", (0, 0), (0, -1), 1, BRAND),
    ]
    for j in range(JOURS):
        c = 1 + j * 2
        style.append(("SPAN", (c, 0), (c + 1, 0)))
        style.append(("LINEAFTER", (c + 1, 0), (c + 1, -1), 1, BRAND))
    t.setStyle(TableStyle(style))
    return t


def bloc_formateur():
    data = [[
        Paragraph(f"<b>Nom du formateur :</b> {POINTILLES}<br/><br/><b>Signature :</b>", styles["champ"]),
        Paragraph(f"<b>Total des heures réalisées :</b> {POINTILLES}<br/><br/>"
                  f"<b>Fait à</b> .................... <b>le</b> ....................", styles["champ"]),
    ]]
    t = Table(data, colWidths=[CONTENT_W * 0.5, CONTENT_W * 0.5], rowHeights=[2.1 * cm])
    t.setStyle(TableStyle([
        ("BOX", (0, 0), (-1, -1), 0.6, SAND),
        ("INNERGRID", (0, 0), (-1, -1), 0.6, SAND),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
    ]))
    return t


def on_page(canvas, doc):
    # Fond blanc, volontairement : cette feuille s'imprime en série, un aplat pleine page coûte de l'encre.
    canvas.saveState()
    canvas.setFillColor(MUTED)
    canvas.setFont("Times-Roman", 7.5)
    canvas.drawString(MARGIN, 0.9 * cm,
                      "Claude Agency — claudeagency.fr · "
                      "La signature se recueille par demi-journée : une signature unique en début de session ne prouve pas l'assiduité.")
    canvas.drawRightString(PAGE[0] - MARGIN, 0.9 * cm, str(doc.page))
    canvas.restoreState()


def build():
    doc = SimpleDocTemplate(
        OUT, pagesize=PAGE,
        leftMargin=MARGIN, rightMargin=MARGIN, topMargin=MARGIN, bottomMargin=1.4 * cm,
        title="Modèle de feuille d'émargement (vierge)",
        author="Claude Agency — claudeagency.fr",
    )
    doc.build([
        bandeau(),
        Spacer(1, 8),
        champs_session(),
        Spacer(1, 6),
        tableau_emargement(),
        Spacer(1, 8),
        bloc_formateur(),
    ], onFirstPage=on_page, onLaterPages=on_page)
    print("PDF généré :", OUT)


def _check():
    """Le modèle doit tenir sur UNE page : au-delà, le tableau est illisible à l'impression."""
    import re
    build()
    with open(OUT, "rb") as f:
        pages = [int(n) for n in re.findall(rb"/Count (\d+)", f.read())]
    assert os.path.getsize(OUT) > 2000, "PDF vide"
    assert pages == [1], f"le modele doit tenir sur 1 page, /Count = {pages}"
    print("OK : 1 page,", os.path.getsize(OUT), "octets")


if __name__ == "__main__":
    import sys
    _check() if "--check" in sys.argv else build()
