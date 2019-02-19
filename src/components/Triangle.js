import React from 'react';
import PropTypes from 'prop-types';
import {
  Circle,
  Layer,
  Shape,
  Text,
} from 'react-konva';

const Triangle = ({
  color,
  node,
  points,
  circleStroke,
  fontSize,
  radius,
  strokeWidth,
  shadowBlur,
}) => (
  <Layer>
    <Shape
      sceneFunc={(context, shape) => {
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        context.lineTo(points[1].x, points[1].y);
        context.lineTo(points[2].x, points[2].y);
        context.closePath();
        context.fillStrokeShape(shape);
      }}
      stroke={color}
      strokeWidth={3}
      opacity={0.5}
    />
    <Circle
      x={points[0].x}
      y={points[0].y}
      radius={radius}
      stroke={circleStroke}
      strokeWidth={strokeWidth}
      shadowBlur={shadowBlur}
    />
    <Circle
      x={points[1].x}
      y={points[1].y}
      radius={radius}
      stroke={circleStroke}
      strokeWidth={strokeWidth}
      shadowBlur={shadowBlur}
    />
    <Circle
      x={points[2].x}
      y={points[2].y}
      radius={radius}
      stroke={circleStroke}
      strokeWidth={strokeWidth}
      shadowBlur={shadowBlur}
    />
    <Text
      x={points[0].x - 40}
      y={points[0].y - 40}
      text={node.A}
      fontSize={fontSize}
      fill={color}
    />
    <Text
      x={points[1].x - 40}
      y={points[1].y + 20}
      text={node.B}
      fontSize={fontSize}
      fill={color}
    />
    <Text
      x={points[2].x + 20}
      y={points[2].y + 20}
      text={node.C}
      fontSize={fontSize}
      fill={color}
    />
  </Layer>
);

Triangle.propTypes = {
  color: PropTypes.string.isRequired,
  node: PropTypes.shape({
    A: PropTypes.string.isRequired,
    B: PropTypes.string.isRequired,
    C: PropTypes.string.isRequired,
  }).isRequired,
  points: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  })).isRequired,
  radius: PropTypes.number.isRequired,
  shadowBlur: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  fontSize: PropTypes.number.isRequired,
  circleStroke: PropTypes.string.isRequired,
};

export default Triangle;
