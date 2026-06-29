"""
Assemblage VSL Claude Agency v3 — MoviePy 2.x
Usage : python assemble_vsl.py
Dépendances : pip install moviepy
"""

import sys
import traceback
from pathlib import Path

BASE       = Path(__file__).parent
SCENES_DIR = BASE / "scenes"
VOIX_OFF   = BASE / "voix_off_vsl_v3.mp3"
OUTPUT     = BASE / "VSL-ClaudeAgency-v3-final.mp4"

SCENE_FILES     = [SCENES_DIR / f"scene_{i}.mp4" for i in range(1, 8)]
SCENE_DURATIONS = [5, 4, 16, 15, 10, 12, 15]   # durées cibles en secondes
FADE_DURATION   = 0.3
FPS             = 24
RESOLUTION      = (1920, 1080)


def check_files() -> bool:
    missing = [f for f in SCENE_FILES if not f.exists()]
    if missing:
        print("Scènes manquantes :")
        for f in missing:
            print(f"   - {f.name}")
        return False
    if not VOIX_OFF.exists():
        print(f"Voix off absente ({VOIX_OFF.name}) — assemblage sans audio.")
    return True


def assemble():
    from moviepy import (
        VideoFileClip, AudioFileClip,
        concatenate_videoclips,
    )
    import moviepy.video.fx as vfx

    print("Chargement des scenes...")
    clips = []
    for i, (scene_file, target_dur) in enumerate(zip(SCENE_FILES, SCENE_DURATIONS), 1):
        print(f"   Scene {i}: {scene_file.name}")
        clip = VideoFileClip(str(scene_file))

        # Redimensionner à 1920x1080
        clip = clip.with_effects([vfx.Resize(RESOLUTION)])

        # Ajuster la durée
        if clip.duration < target_dur:
            clip = clip.with_effects([vfx.Loop(duration=target_dur)])
        elif clip.duration > target_dur:
            clip = clip.subclipped(0, target_dur)

        # Changer le fps si nécessaire
        if clip.fps != FPS:
            clip = clip.with_fps(FPS)

        # Fade in/out
        clip = clip.with_effects([
            vfx.FadeIn(FADE_DURATION),
            vfx.FadeOut(FADE_DURATION),
        ])
        clips.append(clip)

    print("Concatenation des clips...")
    video = concatenate_videoclips(clips, method="compose")

    if VOIX_OFF.exists():
        print("Chargement de la voix off...")
        voix = AudioFileClip(str(VOIX_OFF))
        if voix.duration > video.duration:
            voix = voix.subclipped(0, video.duration)
        video = video.with_audio(voix)
    else:
        print("Video muette (voix_off_vsl_v3.mp3 absent).")

    print(f"Export -> {OUTPUT.name} ({RESOLUTION[0]}x{RESOLUTION[1]}, {FPS}fps)...")
    video.write_videofile(
        str(OUTPUT),
        fps=FPS,
        codec="libx264",
        audio_codec="aac",
        bitrate="8000k",
        threads=4,
        preset="medium",
        logger="bar",
    )

    for c in clips:
        c.close()
    video.close()

    size_mb = OUTPUT.stat().st_size / 1_048_576
    print(f"\nVideo finale : {OUTPUT.name}")
    print(f"Duree : {video.duration:.1f}s | Taille : {size_mb:.1f} MB")


if __name__ == "__main__":
    print("=== Assemblage VSL Claude Agency v3 ===\n")
    if not check_files():
        print("\nFichiers manquants. Verifiez les scenes.")
        sys.exit(1)
    try:
        assemble()
        print("\nAssemblage termine.")
    except Exception:
        traceback.print_exc()
        sys.exit(1)
