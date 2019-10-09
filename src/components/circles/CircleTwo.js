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

const CircleTwo = ({
  points,
  stroke,
  circleTwoPoints,
  themeColor,
  handleMouseEnter,
  handleMouseLeave,
  handleClick,
  nodeStatus,
}) => {
  const currentLeftSize = nodeStatus ? '3cm' : '7cm';
  const currentRightSize = nodeStatus ? '4cm' : '9cm';
  const activeSize = (nodeStatus !== false) ? fontSize : smallSize;
  const activeRadius = (nodeStatus !== false) ? 10 : 5;

  return (
    <Fragment>
      <Circle
        x={circleTwoPoints.x}
        y={circleTwoPoints.y}
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
        y={circleTwoPoints.y}
        radius={activeRadius}
        stroke={stroke}
        strokeWidth={strokeWidth}
        shadowBlur={shadowBlur}
        fill={themeColor}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <Text
        x={points[0].x - 40}
        y={circleTwoPoints.y - 10}
        text="F"
        fontSize={activeSize}
        fill={themeColor}
      />
      <Text
        x={points[0].x - 50}
        y={circleTwoPoints.y + 40}
        text={currentLeftSize}
        fontSize={textSize}
        fill={color}
      />
      <Text
        x={circleTwoPoints.x + 20}
        y={circleTwoPoints.y - 10}
        text="G"
        fontSize={activeSize}
        fill={themeColor}
      />
      <Text
        x={circleTwoPoints.x + 70}
        y={circleTwoPoints.y + 30}
        text={currentRightSize}
        fontSize={textSize}
        fill={color}
      />
    </Fragment>
  );
};

CircleTwo.propTypes = {
  node: PropTypes.shape({
    A: PropTypes.string.isRequired,
    B: PropTypes.string.isRequired,
    C: PropTypes.string.isRequired,
  }).isRequired,
  points: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  })).isRequired,
  stroke: PropTypes.string.isRequired,
  themeColor: PropTypes.string.isRequired,
  circleTwoPoints: PropTypes.shape({}).isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  nodeStatus: PropTypes.bool.isRequired,
};

export default CircleTwo;
