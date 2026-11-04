let audioCtx = null;

export function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

const NOTE_FREQS = {
  C4: 261.63, E4: 329.63, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, E5: 659.25, G5: 783.99, A5: 880.00, B5: 987.77, C6: 1046.50
};

export function playTone(val, duration = 0.15) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const freq = typeof val === 'number' ? val : (NOTE_FREQS[val] || 440);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.setValueAtTime(0.2, ctx.currentTime + duration - 0.03);
    gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.error(e);
  }
}

export function playNote(note) {
  playTone(note, 0.14);
}

export function playChord(notes) {
  if (Array.isArray(notes)) {
    notes.forEach((n, i) => {
      setTimeout(() => playTone(n, 0.2), i * 50);
    });
  }
}