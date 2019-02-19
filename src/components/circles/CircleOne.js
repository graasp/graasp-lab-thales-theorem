import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Line,
  Group,
  Circle,
  Text,
} from 'react-konva';

const CircleOne = ({
  points,
  lineStrokeWidth,
  stroke,
  strokeWidth,
  shadowBlur,
  circleOnePoints,
  themeColor,
  handleMouseEnter,
  handleMouseLeave,
  fontSize,
}) => (
  <Fragment>
    <Group>
      <Circle
        x={circleOnePoints.x}
        y={circleOnePoints.y}
        radius={10}
        stroke={stroke}
        strokeWidth={strokeWidth}
        shadowBlur={shadowBlur}
        fill={themeColor}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <Circle
        x={points[0].x}
        y={circleOnePoints.y}
        radius={10}
        stroke={stroke}
        strokeWidth={strokeWidth}
        shadowBlur={shadowBlur}
        fill={themeColor}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <Line
        points={
          [
            points[0].x,
            circleOnePoints.y,
            circleOnePoints.x,
            circleOnePoints.y,
          ]
        }
        stroke={themeColor}
        strokeWidth={lineStrokeWidth}
      />
      <Text
        x={points[0].x - 40}
        y={circleOnePoints.y - 10}
        text="D"
        fontSize={fontSize}
        fill={themeColor}
      />
      <Text
        x={circleOnePoints.x + 20}
        y={circleOnePoints.y - 10}
        text="E"
        fontSize={fontSize}
        fill={themeColor}
      />
    </Group>
  </Fragment>
);

CircleOne.propTypes = {
  node: PropTypes.shape({
    A: PropTypes.string.isRequired,
    B: PropTypes.string.isRequired,
    C: PropTypes.string.isRequired,
  }).isRequired,
  points: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  })).isRequired,
  shadowBlur: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  lineStrokeWidth: PropTypes.number.isRequired,
  stroke: PropTypes.string.isRequired,
  themeColor: PropTypes.string.isRequired,
  circleOnePoints: PropTypes.shape({}).isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  fontSize: PropTypes.number.isRequired,
};

export default CircleOne;
