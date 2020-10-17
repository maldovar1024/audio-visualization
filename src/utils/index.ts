import { RefObject } from 'react';

export { drawFrequencyHistogram, resetFrequencyCanvas } from './draw-frequency';
export { drawWave, resetWaveCanvas } from './draw-wave';

export function getCanvasAndContext(
  ref: RefObject<HTMLCanvasElement>
): {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
} | null {
  const canvas = ref.current;
  if (!canvas) return null;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  return { canvas, ctx };
}
