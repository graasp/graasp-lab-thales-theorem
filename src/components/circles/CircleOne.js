import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Circle, Text } from 'react-konva';
import {
  color,
  strokeWidth,
  shadowBlur,
  fontSize,
  textSize,
  smallSize,
} from '../../config/properties';

const CircleOne = ({
  points,
  stroke,
  circleOnePoints,
  themeColor,
  handleMouseEnter,
  handleMouseLeave,
  handleClick,
  nodeStatus,
}) => {
  const currentLeftSize = nodeStatus ? '9cm' : '';
  const currentRightSize = nodeStatus ? '12cm' : '';
  const currentTopLeftSize = nodeStatus ? '' : '5cm';
  const currentTopRightSize = nodeStatus ? '' : '7cm';
  const activeSize = nodeStatus ? smallSize : fontSize;
  const activeRadius = nodeStatus ? 5 : 10;
  return (
    <Fragment>
      <Circle
        x={circleOnePoints.x}
        y={circleOnePoints.y}
        radius={activeRadius}
        stroke={stroke}
        strokeWidth={strokeWidth}
        shadowBlur={shadowBlur}
        fill={themeColor}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />
      <Circle
        x={points[0].x}
        y={circleOnePoints.y}
        radius={activeRadius}
        stroke={stroke}
        strokeWidth={strokeWidth}
        shadowBlur={shadowBlur}
        fill={themeColor}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <Text
        x={points[0].x - 50}
        y={circleOnePoints.y + 60}
        text={currentLeftSize}
        fontSize={textSize}
        fill={color}
      />
      <Text
        x={points[0].x - 50}
        y={circleOnePoints.y - 100}
        text={currentTopLeftSize}
        fontSize={textSize}
        fill={color}
      />
      <Text
        x={points[0].x - 40}
        y={circleOnePoints.y - 10}
        text="D"
        fontSize={activeSize}
        fill={themeColor}
      />
      <Text
        x={points[0].x + 170}
        y={circleOnePoints.y - 100}
        text={currentTopRightSize}
        fontSize={textSize}
        fill={color}
      />
      <Text
        x={circleOnePoints.x + 20}
        y={circleOnePoints.y - 10}
        text="E"
        fontSize={activeSize}
        fill={themeColor}
      />
      <Text
        x={circleOnePoints.x + 120}
        y={circleOnePoints.y + 60}
        text={currentRightSize}
        fontSize={textSize}
        fill={color}
      />
    </Fragment>
  );
};

CircleOne.propTypes = {
  node: PropTypes.shape({
    A: PropTypes.string.isRequired,
    B: PropTypes.string.isRequired,
    C: PropTypes.string.isRequired,
  }).isRequired,
  points: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
  ).isRequired,
  stroke: PropTypes.string.isRequired,
  themeColor: PropTypes.string.isRequired,
  circleOnePoints: PropTypes.shape({}).isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  nodeStatus: PropTypes.bool.isRequired,
};

export default CircleOne;
