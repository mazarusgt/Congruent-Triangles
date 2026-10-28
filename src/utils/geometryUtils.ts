export interface LineSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

/**
 * Computes geometry tick marks on a triangle side.
 * Tick marks are perpendicular to the side, and multiple marks (1, 2, or 3)
 * are strictly parallel to each other and evenly spaced along the side.
 * 
 * @param p1 [x, y] start coordinate of the side
 * @param p2 [x, y] end coordinate of the side
 * @param count Number of tick marks (1, 2, or 3)
 * @param length Length of each tick mark cutting across the side (default 14px)
 * @param spacing Spacing between parallel tick marks along the side (default 5px)
 */
export function getSideTickMarks(
  p1: [number, number],
  p2: [number, number],
  count: number,
  length = 14,
  spacing = 5
): LineSegment[] {
  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  const dist = Math.hypot(dx, dy);
  if (dist === 0) return [];

  // Unit vector along the side
  const ux = dx / dist;
  const uy = dy / dist;

  // Unit vector perpendicular to the side (normal vector)
  const nx = -uy;
  const ny = ux;

  // Midpoint of the side
  const mx = (p1[0] + p2[0]) / 2;
  const my = (p1[1] + p2[1]) / 2;

  const result: LineSegment[] = [];
  for (let i = 0; i < count; i++) {
    const offset = (i - (count - 1) / 2) * spacing;
    const cx = mx + offset * ux;
    const cy = my + offset * uy;

    result.push({
      x1: Number((cx - (length / 2) * nx).toFixed(2)),
      y1: Number((cy - (length / 2) * ny).toFixed(2)),
      x2: Number((cx + (length / 2) * nx).toFixed(2)),
      y2: Number((cy + (length / 2) * ny).toFixed(2)),
    });
  }
  return result;
}
