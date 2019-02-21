import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Group,
  Circle,
  Text,
} from 'react-konva';
import {
  strokeWidth,
  shadowBlur,
  fontSize,
} from '../../config/properties';

const CircleTwo = ({
  points,
  stroke,
  circleTwoPoints,
  themeColor,
  handleMouseEnter,
  handleMouseLeave,
  handleClick,
}) => (
  <Fragment>
    <Group>
      <Circle
        x={circleTwoPoints.x}
        y={circleTwoPoints.y}
        radius={10}
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
        radius={10}
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
        fontSize={fontSize}
        fill={themeColor}
      />
      <Text
        x={circleTwoPoints.x + 20}
        y={circleTwoPoints.y - 10}
        text="G"
        fontSize={fontSize}
        fill={themeColor}
      />
    </Group>
  </Fragment>
);

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
};

export default CircleTwo;
