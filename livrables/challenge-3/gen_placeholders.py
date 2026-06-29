"""
Génération des 7 clips placeholder pour VSL Claude Agency v3
Dépendances : Pillow uniquement (déjà installé : v12.2.0)
Format : AVI MJPEG (compatible MoviePy/ffmpeg)
Usage  : python gen_placeholders.py
"""

import struct
import io
import sys
import traceback
from pathlib import Path
from PIL import Image, ImageDraw

# ---------------------------------------------------------------------------
# Paramètres — résolution réduite pour génération rapide
# (MoviePy redimensionne à 1080p lors de l'assemblage)
# ---------------------------------------------------------------------------
W, H  = 320, 180    # 16:9
FPS   = 2           # 2 fps → frames légères

CREAM = (251, 247, 241)
TERRA = (204, 120,  92)
INK   = ( 43,  39,  36)

SCENES = [
    # (durée_s, bg, titre, description)
    ( 5, CREAM, "SCÈNE 1", "Dirigeante à son bureau\nfin de journée — dossiers empilés"),
    ( 4, CREAM, "SCÈNE 2", "Classeur Qualiopi ouvert\nhorloge 19h"),
    (16, CREAM, "SCÈNE 3", "Split-screen Google + dirigeante"),
    (15, CREAM, "SCÈNE 4", "Checklist Qualiopi + maquette site"),
    (10, CREAM, "SCÈNE 5", "Salle de formation — stagiaires"),
    (12, CREAM, "SCÈNE 6", "Équipe Claude Agency"),
    (15, TERRA, "SCÈNE 7", "Réserver mon audit offert\nclaudeagency.fr"),
]

OUT = Path(__file__).parent / "scenes"
OUT.mkdir(exist_ok=True)


# ---------------------------------------------------------------------------
# Helpers RIFF / AVI
# ---------------------------------------------------------------------------

def chunk(cc: str, data: bytes) -> bytes:
    s = len(data)
    out = cc.encode() + struct.pack("<I", s) + data
    if s % 2:
        out += b"\x00"
    return out

def lst(lt: str, data: bytes) -> bytes:
    p = lt.encode() + data
    return b"LIST" + struct.pack("<I", len(p)) + p

def write_avi(path: Path, frames: list[bytes]) -> None:
    nf   = len(frames)
    mspf = 1_000_000 // FPS
    maxb = max(len(f) for f in frames)
    mjpg = struct.unpack("<I", b"MJPG")[0]

    avih = struct.pack("<IIIIIIIIIIIIII",
        mspf, maxb * FPS, 0, 0x10, nf, 0, 1, maxb, W, H, 0, 0, 0, 0)

    # AVISTREAMHEADER: 56 bytes — rcFrame uses SHORT (H), not LONG
    strh = struct.pack("<4s4sIHHIIIIIIIIHHHH",
        b"vids", b"MJPG", 0, 0, 0, 0, 1, FPS, 0, nf, maxb, 0xFFFFFFFF, 0,
        0, 0, W, H)

    # BITMAPINFOHEADER: 40 bytes
    strf = struct.pack("<IiiHHIIIIII",
        40, W, H, 1, 24, mjpg, W * H * 3, 0, 0, 0, 0)

    strl = lst("strl", chunk("strh", strh) + chunk("strf", strf))
    hdrl = lst("hdrl", chunk("avih", avih) + strl)

    movi_p, idx, off = b"movi", [], 4
    for f in frames:
        c = chunk("00dc", f)
        movi_p += c
        idx.append(struct.pack("<4sIII", b"00dc", 0x10, off, len(f)))
        off += len(c)

    movi = b"LIST" + struct.pack("<I", len(movi_p)) + movi_p
    idx1 = chunk("idx1", b"".join(idx))
    body = b"AVI " + hdrl + movi + idx1
    riff = b"RIFF" + struct.pack("<I", len(body)) + body
    path.write_bytes(riff)


# ---------------------------------------------------------------------------
# Génération d'une frame JPEG
# ---------------------------------------------------------------------------

def make_frame(num: int, title: str, desc: str, bg: tuple,
               fi: int, nf: int) -> bytes:
    img = Image.new("RGB", (W, H), bg)
    d   = ImageDraw.Draw(img)

    accent = CREAM if bg == TERRA else TERRA

    # Barre de couleur accent (haut + bas)
    d.rectangle([(0, 0), (W, 4)], fill=accent)
    d.rectangle([(0, H - 4), (W, H)], fill=accent)

    # Numéro de scène centré
    d.text((W // 2, H // 2 - 28), title, fill=accent,
           anchor="mm", font_size=22)

    fg = CREAM if bg == TERRA else INK
    for i, line in enumerate(desc.split("\n")):
        d.text((W // 2, H // 2 + 8 + i * 16), line, fill=fg,
               anchor="mm", font_size=11)

    # Barre de progression
    bar_w = int(W * fi / max(nf - 1, 1))
    d.rectangle([(0, H - 4), (bar_w, H)], fill=accent)

    buf = io.BytesIO()
    img.save(buf, "JPEG", quality=82)
    return buf.getvalue()


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print("=== Génération des 7 clips placeholder ===\n")
    for i, (dur, bg, title, desc) in enumerate(SCENES, 1):
        nf = FPS * dur
        print(f"Scène {i}: {title} — {dur}s, {nf} frames", end="", flush=True)

        frames = [make_frame(i, title, desc, bg, fi, nf) for fi in range(nf)]

        avi_path = OUT / f"scene_{i}.avi"
        write_avi(avi_path, frames)

        mp4_path = OUT / f"scene_{i}.mp4"
        if mp4_path.exists():
            mp4_path.unlink()
        avi_path.rename(mp4_path)

        kb = mp4_path.stat().st_size // 1024
        print(f" → {mp4_path.name} ({kb} KB)")

    print(f"\n✅ 7 clips dans {OUT}")
    print("   À remplacer par les clips Wan2.2 dès qu'un espace est disponible.")


if __name__ == "__main__":
    try:
        main()
    except Exception:
        traceback.print_exc()
        sys.exit(1)
