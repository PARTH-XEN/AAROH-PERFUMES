// Luxury Ambient Audio Engine (Web Audio API)
// Provides a warm, cinematic soundscape with no external audio file dependencies

class LuxuryAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private oscillators: OscillatorNode[] = [];

  public init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioContextClass();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);

    // Warm cinematic lowpass filter (velvety, non-fatiguing)
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(280, this.ctx.currentTime);
    this.filterNode.Q.setValueAtTime(1.5, this.ctx.currentTime);

    this.filterNode.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);
  }

  public start() {
    this.init();
    if (!this.ctx || !this.masterGain || !this.filterNode) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    // Stop any existing
    this.stopOscillators();

    // Harmonic chords for luxury perfume atmosphere (A2, E3, A3, C#4)
    const freqs = [108, 162, 216, 272];

    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.filterNode) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle slow frequency vibrato for living, breathing feel
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.15 + idx * 0.05, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(1.2, this.ctx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      oscGain.gain.setValueAtTime(0.08 / freqs.length, this.ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(this.filterNode);
      osc.start();

      this.oscillators.push(osc);
    });

    // Fade in gracefully
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.45, this.ctx.currentTime + 2.5);
    this.isPlaying = true;
  }

  public stop() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);
    setTimeout(() => {
      this.stopOscillators();
      this.isPlaying = false;
    }, 1300);
  }

  private stopOscillators() {
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // already stopped
      }
    });
    this.oscillators = [];
  }

  public modulateWithScroll(progress: number) {
    if (!this.filterNode || !this.ctx || !this.isPlaying) return;
    // Open the filter slightly as user moves deeper into the perfume story
    const targetFreq = 260 + progress * 320;
    this.filterNode.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.2);
  }

  public get playing() {
    return this.isPlaying;
  }
}

export const audioEngine = new LuxuryAudioEngine();
