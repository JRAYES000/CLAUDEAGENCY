"""
Assemblage VSL Claude Agency v3 FINAL - Fix Windows PermissionError
Strategie : video sans audio -> audio WAV -> merge ffmpeg direct
"""
import sys
import os
import subprocess
import traceback
from pathlib import Path
import time

BASE     = Path(__file__).parent
V2_MP4   = BASE / "VSL-ClaudeAgency-juin2026-v2.mp4"
VOIX_P2  = BASE / "voix_off_v3_nouvelle_section.mp3"
SCENES   = [BASE / "scenes" / f"scene_{i}.mp4" for i in [8, 9, 10, 11]]
OUTPUT   = BASE / "VSL-ClaudeAgency-v3-FINAL.mp4"
VID_ONLY = BASE / "_tmp_vsl_v3_video.mp4"
AUD_WAV  = BASE / "_tmp_vsl_v3_audio.wav"
LOG      = BASE / "assemble_v3_fix_log.txt"

log = open(str(LOG), "w", encoding="utf-8", buffering=1)
sys.stdout = log
sys.stderr = log

try:
    from moviepy import VideoFileClip, AudioFileClip, concatenate_videoclips
    import moviepy.video.fx as vfx
    import imageio_ffmpeg

    FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
    print(f"ffmpeg: {FFMPEG}")
    print("=== Assemblage VSL v3 FINAL ===\n")

    part1 = VideoFileClip(str(V2_MP4))
    TARGET_FPS  = part1.fps
    TARGET_SIZE = (part1.w, part1.h)
    print(f"v2: {part1.duration:.2f}s | {TARGET_SIZE} | {TARGET_FPS}fps")

    voix_p2     = AudioFileClip(str(VOIX_P2))
    p2_audio_dur = voix_p2.duration
    print(f"Audio P2: {p2_audio_dur:.2f}s")

    raw_clips = []
    for s in SCENES:
        c = VideoFileClip(str(s))
        c = c.with_effects([vfx.Resize(TARGET_SIZE)]).with_fps(TARGET_FPS)
        print(f"  {s.name}: {c.duration:.1f}s")
        raw_clips.append(c)

    part2_concat = concatenate_videoclips(raw_clips, method="compose")
    if part2_concat.duration >= p2_audio_dur:
        part2_video = part2_concat.subclipped(0, p2_audio_dur)
    else:
        part2_video = part2_concat.with_effects([vfx.Loop(duration=p2_audio_dur)])

    part2 = part2_video.with_audio(voix_p2)
    final = concatenate_videoclips([part1, part2], method="compose")
    total_dur = final.duration
    print(f"Duree totale: {total_dur:.2f}s")

    # Etape 1 : ecrire video sans audio
    print(f"\nEtape 1: video sans audio -> {VID_ONLY.name}")
    final.write_videofile(
        str(VID_ONLY),
        fps=TARGET_FPS,
        codec="libx264",
        audio=False,
        bitrate="8000k",
        logger=None,
    )
    print(f"  OK: {VID_ONLY.stat().st_size / 1e6:.1f} MB")

    # Etape 2 : ecrire audio P2 en WAV
    print(f"\nEtape 2: audio P2 -> {AUD_WAV.name}")
    # Pad l'audio avec du silence au debut (duree part1)
    # On va concatener silence(44.96s) + voix_p2 pour que l'audio soit aligne
    voix_p2.write_audiofile(str(AUD_WAV), fps=44100, logger=None)
    voix_p2.close()
    print(f"  OK: {AUD_WAV.stat().st_size / 1e3:.0f} KB")

    # Fermer tous les clips
    for c in raw_clips:
        try: c.close()
        except: pass
    for c in [part1, part2_concat, part2, final]:
        try: c.close()
        except: pass
    time.sleep(1)

    # Etape 3 : merge avec ffmpeg
    # La video P1 (44.96s) a deja son audio. On doit merger:
    # - video complète (76.74s) depuis VID_ONLY
    # - audio complet = audio_part1 (depuis V2_MP4, 0-44.96s) + voix_p2 (44.96-76.74s)
    # On utilise ffmpeg avec deux inputs audio et filter_complex pour les concatener
    part1_dur = 44.96  # duree V2
    print(f"\nEtape 3: merge final -> {OUTPUT.name}")
    cmd = [
        FFMPEG, "-y",
        "-i", str(VID_ONLY),      # video sans audio
        "-i", str(V2_MP4),        # audio part1
        "-i", str(AUD_WAV),       # audio part2 (voix off)
        "-filter_complex",
        f"[1:a]atrim=0:{part1_dur},asetpts=PTS-STARTPTS[a1];"
        f"[2:a]asetpts=PTS-STARTPTS[a2];"
        "[a1][a2]concat=n=2:v=0:a=1[aout]",
        "-map", "0:v",
        "-map", "[aout]",
        "-c:v", "copy",
        "-c:a", "aac",
        "-b:a", "128k",
        str(OUTPUT)
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    if result.returncode != 0:
        print("ERREUR ffmpeg:")
        print(result.stderr[-2000:])
        raise RuntimeError("ffmpeg merge failed")

    size_mb = OUTPUT.stat().st_size / 1_048_576
    print(f"\nDONE: {total_dur:.1f}s | {size_mb:.1f} MB -> {OUTPUT.name}")

    # Cleanup
    for tmp in [VID_ONLY, AUD_WAV]:
        try:
            tmp.unlink()
            print(f"Supprime: {tmp.name}")
        except:
            pass

except Exception:
    traceback.print_exc()
finally:
    log.close()
