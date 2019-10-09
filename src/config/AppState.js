export const AppState = {
  isMouseInside: false,
  showTitle: true,
  openModal: false,
  circleOneShape: [],
  circleTwoShape: [],
  node: {
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D',
    E: 'E',
  },
  points: [
    { x: 100, y: 50 },
    { x: 100, y: 500 },
    { x: 700, y: 500 },
  ],
  circleOnePoints: { x: 368, y: 250 },
  circleTwoPoints: { x: 565, y: 400 },
  isDrawing: false, // in the process of drawing a shape
  isDrawingMode: false, // allow shapes to be drawn
  circleKind: null,
};

export default AppState;
