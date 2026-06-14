#!/usr/bin/env python3
"""Génère le lead magnet PDF « 10 automatisations IA » à la charte Claude Partners.

Sortie : app/public/ressources/10-automatisations-ia.pdf
Lancer depuis app/ :  python scripts/generate-lead-magnet-pdf.py
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.colors import HexColor, white
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether, HRFlowable,
)

# Palette (approx. charte du site)
BRAND = HexColor("#BE5B3A")
INK = HexColor("#2B2A28")
MUTED = HexColor("#6E665C")
CREAM = HexColor("#FBF8F2")
SAND = HexColor("#E7DECF")

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "public", "ressources", "10-automatisations-ia.pdf"))
os.makedirs(os.path.dirname(OUT), exist_ok=True)

MARGIN = 2 * cm
CONTENT_W = A4[0] - 2 * MARGIN

styles = {
    "h_title": ParagraphStyle("h_title", fontName="Times-Bold", fontSize=21, leading=25, textColor=white),
    "subtitle": ParagraphStyle("subtitle", fontName="Times-Roman", fontSize=11, leading=16, textColor=MUTED, spaceBefore=10),
    "intro": ParagraphStyle("intro", fontName="Times-Roman", fontSize=11, leading=17, textColor=INK, spaceBefore=14),
    "eyebrow": ParagraphStyle("eyebrow", fontName="Times-Bold", fontSize=8.5, leading=11, textColor=BRAND),
    "fiche_h": ParagraphStyle("fiche_h", fontName="Times-Bold", fontSize=13, leading=16, textColor=INK, spaceBefore=2),
    "body": ParagraphStyle("body", fontName="Times-Roman", fontSize=10.5, leading=15, textColor=INK, spaceBefore=3),
    "result": ParagraphStyle("result", fontName="Times-Italic", fontSize=10, leading=14, textColor=BRAND, spaceBefore=4),
    "cta_h": ParagraphStyle("cta_h", fontName="Times-Bold", fontSize=15, leading=19, textColor=white),
    "cta_b": ParagraphStyle("cta_b", fontName="Times-Roman", fontSize=10.5, leading=15, textColor=white, spaceBefore=6),
}

TITLE = "10 automatisations IA qui libèrent 1 jour/semaine dans un organisme de formation"
SUBTITLE = ("Tiré d'un organisme de formation réel. Pour chaque tâche : l'automatisation mise en place, "
            "le temps gagné et l'outil utilisé.")
INTRO = ("Diriger un organisme de formation, c'est faire dix métiers à la fois : pédagogie, commercial, "
         "marketing, administratif, qualité. Les journées n'y suffisent pas. Voici dix tâches chronophages "
         "que nous avons réellement automatisées — et le temps que chacune a rendu.")

FICHES = [
    ("1", "Les relances administratives",
     "Émargements non signés, questionnaires de satisfaction sans réponse, stagiaires qui décrochent : "
     "les relances manuelles grignotent des heures chaque jour. Une automatisation repère les manquants "
     "et relance au bon moment, jusqu'à obtention.",
     "Avant : 2 h/jour · Après : 2 h/mois · Outil : Make"),
    ("2", "Les comptes rendus de visioconférence",
     "Après chaque visio formateur-client, il faut rédiger le compte rendu et le classer. "
     "L'échange est transcrit, résumé et rangé automatiquement dans le bon dossier.",
     "Avant : 2-3 h/semaine · Après : 2-3 h/mois · Outil : Make + transcription IA"),
    ("3", "Le coaching des commerciaux",
     "Impossible d'écouter tous les appels de vente pour aider l'équipe à progresser. Un agent IA analyse "
     "chaque appel et envoie au commercial des conseils personnalisés juste après, pour améliorer son closing.",
     "Avant : surveillance manuelle intenable · Après : coaching auto après chaque appel · Outil : agent IA"),
    ("4", "La création de tunnels de vente",
     "Monter une page de capture, un lead magnet et une séquence d'emails prenait une demi-journée. "
     "L'automatisation génère l'ensemble en quelques minutes, prêt à publier.",
     "Avant : 5-6 h par tunnel · Après : quelques minutes · Outil : IA + automatisation"),
    ("5", "La génération de supports de cours",
     "Repartir d'une page blanche à chaque session épuise les formateurs. À partir de votre programme, "
     "un support complet et structuré est généré, prêt à relire.",
     "Avant : une demi-journée · Après : quelques minutes · Outil : Claude"),
    ("6", "Quiz, études de cas et corrigés",
     "Évaluer suppose de créer quiz, cas pratiques et corrigés adaptés à chaque niveau. "
     "L'IA les produit à partir de vos contenus, sans repartir de zéro.",
     "Gain : des heures économisées par session · Outil : Claude"),
    ("7", "Le dossier d'audit Qualiopi",
     "Préparer un audit de surveillance se fait souvent dans l'urgence. Les pièces sont rassemblées "
     "et pré-remplies automatiquement ; il ne reste qu'à vérifier.",
     "Avant : préparation dans l'urgence · Après : dossier prêt à vérifier · Outil : Make + IA"),
    ("8", "L'assistant qui répond aux stagiaires",
     "Les mêmes questions reviennent en boucle. Un assistant IA entraîné sur votre offre répond aux "
     "stagiaires 24/7, et transmet à l'humain ce qui le nécessite vraiment.",
     "Gain : moins d'interruptions, réponses immédiates · Outil : agent IA"),
    ("9", "Chaque réunion transformée en compte rendu",
     "Dès la fin d'une réunion, son compte rendu — et, si besoin, un support — est produit et partagé "
     "automatiquement. Plus aucune décision perdue.",
     "Gain : zéro réunion « dans le vide » · Outil : Make + IA"),
    ("10", "Les relances de paiement et de financement",
     "Factures impayées, dossiers de financement (CPF, OPCO) à suivre : les relances partent "
     "automatiquement et le suivi est centralisé.",
     "Gain : trésorerie suivie sans effort · Outil : Make"),
]


def header_band():
    t = Table([[Paragraph(TITLE, styles["h_title"])]], colWidths=[CONTENT_W])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), BRAND),
        ("LEFTPADDING", (0, 0), (-1, -1), 18),
        ("RIGHTPADDING", (0, 0), (-1, -1), 18),
        ("TOPPADDING", (0, 0), (-1, -1), 18),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 18),
        ("ROUNDEDCORNERS", [8, 8, 8, 8]),
    ]))
    return t


def cta_box():
    inner = [
        Paragraph("Vous voulez ces automatisations chez vous ?", styles["cta_h"]),
        Paragraph(
            "Commencez par un audit offert : on identifie vos priorités à plus fort ROI et on vous remet "
            "une feuille de route chiffrée. Vous repartez avec, que vous travailliez avec nous ensuite ou non.",
            styles["cta_b"]),
        Paragraph("Réservez votre audit sur <b>claudepartners.fr/contact</b>", styles["cta_b"]),
    ]
    t = Table([[inner]], colWidths=[CONTENT_W])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), BRAND),
        ("LEFTPADDING", (0, 0), (-1, -1), 20),
        ("RIGHTPADDING", (0, 0), (-1, -1), 20),
        ("TOPPADDING", (0, 0), (-1, -1), 18),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 18),
        ("ROUNDEDCORNERS", [8, 8, 8, 8]),
    ]))
    return t


def on_page(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(CREAM)
    canvas.rect(0, 0, A4[0], A4[1], fill=1, stroke=0)
    canvas.setFillColor(MUTED)
    canvas.setFont("Times-Roman", 8)
    canvas.drawString(MARGIN, 1.2 * cm, "Claude Partners — claudepartners.fr")
    canvas.drawRightString(A4[0] - MARGIN, 1.2 * cm, str(doc.page))
    canvas.restoreState()


def build():
    doc = SimpleDocTemplate(
        OUT, pagesize=A4,
        leftMargin=MARGIN, rightMargin=MARGIN, topMargin=MARGIN, bottomMargin=2 * cm,
        title="10 automatisations IA pour organismes de formation",
        author="Julien Rayes — Claude Partners",
    )
    story = [
        Paragraph("GUIDE GRATUIT", styles["eyebrow"]),
        Spacer(1, 6),
        header_band(),
        Paragraph(SUBTITLE, styles["subtitle"]),
        Paragraph(INTRO, styles["intro"]),
        Spacer(1, 10),
        HRFlowable(width="100%", thickness=1, color=SAND, spaceBefore=2, spaceAfter=12),
    ]
    for i, (num, title, detail, result) in enumerate(FICHES):
        block = [
            Paragraph(f'<font color="#BE5B3A">{num}</font>&nbsp;&nbsp;{title}', styles["fiche_h"]),
            Paragraph(detail, styles["body"]),
            Paragraph(result, styles["result"]),
        ]
        story.append(KeepTogether(block))
        if i < len(FICHES) - 1:
            story.append(HRFlowable(width="100%", thickness=0.7, color=SAND, spaceBefore=12, spaceAfter=12))
    story.append(Spacer(1, 22))
    story.append(cta_box())

    doc.build(story, onFirstPage=on_page, onLaterPages=on_page)
    print("PDF généré :", OUT)


if __name__ == "__main__":
    build()
