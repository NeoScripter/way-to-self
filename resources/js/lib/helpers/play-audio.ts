export function playAudio(audioSrc: string, quiet = false, loop = false) {
    const audio = new Audio(audioSrc);
    if (quiet) {
        audio.volume = 0.25;
    }
    if (loop) {
        audio.loop = true;
    }
    audio.play();
}
