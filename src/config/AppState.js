export const AppState = {
  isMouseInside: false,
  showTitle: true,
  openModal: false,
  lineStrokeWidth: 3,
  lineStroke: '#D91111',
  circleStroke: '#555',
  color: '#000',
  fontSize: 30,
  radius: 7,
  strokeWidth: 2,
  shadowBlur: 5,
  node: {
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D',
    E: 'E',
  },
  points: [
    { x: 50, y: 50 },
    { x: 50, y: 600 },
    { x: 700, y: 600 },
  ],
  middleLine: [300, 300, 700, 300],
  bottomLine: [300, 450, 700, 450],
  circleOnePoints: { x: 290, y: 250 },
  circleTwoPoints: { x: 522, y: 450 },
};

export default AppState;
