"""
Assemblage VSL Claude Agency v3
Usage : python assemble_vsl.py
Dépendances : pip install moviepy --break-system-packages
"""

import os
import sys
from pathlib import Path

BASE = Path(__file__).parent
SCENES_DIR = BASE / "scenes"
VOIX_OFF = BASE / "voix_off_vsl_v3.mp3"
SRT_FILE = BASE / "vsl_v3.srt"
OUTPUT = BASE / "VSL-ClaudeAgency-v3-final.mp4"

SCENE_FILES = [SCENES_DIR / f"scene_{i}.mp4" for i in range(1, 8)]

# Durées cibles par scène (en secondes) — pour redimensionner si nécessaire
SCENE_DURATIONS = [5, 4, 16, 15, 10, 12, 15]

FADE_DURATION = 0.3
FPS = 24
RESOLUTION = (1920, 1080)


def check_files():
    missing = [f for f in SCENE_FILES if not f.exists()]
    if missing:
        print("⚠️  Scènes manquantes :")
        for f in missing:
            print(f"   - {f.name}")
        return False
    if not VOIX_OFF.exists():
        print(f"⚠️  Voix off introuvable : {VOIX_OFF}")
        return False
    return True


def assemble():
    from moviepy.editor import (
        VideoFileClip, AudioFileClip, concatenate_videoclips,
        CompositeAudioClip, ColorClip
    )

    print("📂 Chargement des scènes...")
    clips = []
    for i, (scene_file, target_dur) in enumerate(zip(SCENE_FILES, SCENE_DURATIONS), 1):
        print(f"   Scène {i}: {scene_file.name}")
        clip = VideoFileClip(str(scene_file))

        # Redimensionner à 1920x1080 si nécessaire
        if clip.size != list(RESOLUTION):
            clip = clip.resize(RESOLUTION)

        # Ajuster la durée si le clip est trop court ou trop long
        if clip.duration < target_dur:
            # Loop si trop court
            from moviepy.editor import vfx
            clip = clip.fx(vfx.loop, duration=target_dur)
        else:
            clip = clip.subclip(0, target_dur)

        # Fade in/out
        clip = clip.fadein(FADE_DURATION).fadeout(FADE_DURATION)
        clips.append(clip)

    print("🔗 Concaténation des clips...")
    video = concatenate_videoclips(clips, method="compose")

    print("🎙️  Chargement de la voix off...")
    voix = AudioFileClip(str(VOIX_OFF))

    # Ajuster la durée de la voix off à celle de la vidéo si nécessaire
    if voix.duration > video.duration:
        voix = voix.subclip(0, video.duration)

    # Audio final : voix off seule (musique optionnelle commentée ci-dessous)
    audio_final = voix

    # --- Musique de fond optionnelle ---
    # MUSIC_FILE = BASE / "music_ambient.mp3"
    # if MUSIC_FILE.exists():
    #     from moviepy.editor import CompositeAudioClip
    #     music = AudioFileClip(str(MUSIC_FILE)).volumex(0.15)  # ~-20 LUFS relatif
    #     if music.duration < video.duration:
    #         from moviepy.editor import afx
    #         music = music.fx(afx.audio_loop, duration=video.duration)
    #     else:
    #         music = music.subclip(0, video.duration)
    #     audio_final = CompositeAudioClip([voix, music])
    # -----------------------------------

    video = video.set_audio(audio_final)

    print(f"🎬 Export vers {OUTPUT.name} ({RESOLUTION[0]}x{RESOLUTION[1]}, {FPS}fps)...")
    video.write_videofile(
        str(OUTPUT),
        fps=FPS,
        codec="libx264",
        audio_codec="aac",
        bitrate="8000k",
        threads=4,
        preset="medium",
        verbose=False,
        logger="bar"
    )

    # Nettoyage
    for clip in clips:
        clip.close()
    voix.close()
    video.close()

    print(f"✅ Vidéo finale : {OUTPUT}")
    print(f"   Durée : {video.duration:.1f}s | Taille : {OUTPUT.stat().st_size / 1024 / 1024:.1f} MB")


if __name__ == "__main__":
    print("=== Assemblage VSL Claude Agency v3 ===\n")
    if not check_files():
        print("\n❌ Fichiers manquants. Lancez d'abord les étapes 1 et 2.")
        sys.exit(1)
    assemble()
    print("\n✅ Assemblage terminé.")
