import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, Line } from 'react-konva';

class Fraction extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      numerator, denominator, divisor, noColorNum, noColorDeNom,
    } = this.props;

    return (
      <>
        <Text
          x={numerator.x}
          text={numerator.text ? numerator.text : '...'}
          fontStyle="italic"
          fontSize={18}
          fill={noColorNum ? 'white' : 'black'}
        />
        <Line
          x={divisor.x}
          y={divisor.y}
          stroke="grey"
          strokeWidth={3}
          points={[0, 0, 40, 0]}
        />
        <Text
          x={denominator.x}
          y={denominator.y}
          text={denominator.text ? denominator.text : '...'}
          fontStyle="italic"
          fontSize={18}
          fill={noColorDeNom ? 'white' : 'black'}
        />
      </>
    );
  }
}

export default Fraction;

Fraction.propTypes = {
  numerator: PropTypes.string.isRequired,
  denominator: PropTypes.string.isRequired,
  divisor: PropTypes.string.isRequired,
  noColorNum: PropTypes.bool.isRequired,
  noColorDeNom: PropTypes.bool.isRequired,
};
