import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Formula = ({
  node,
  t,
  themeColor,
}) => (
  <div className="resume-container">
    <h1>{t('Description')}</h1>
    <p className="description-definition">
      {t('Lab Explanation')}
    </p>
    <div className="text-center">
      <div className="ab-side">
        <b className="formula-up" style={{ backgroundColor: themeColor }}>
          {node.A}
          {node.B}
        </b>
        <p className="formula-divider">───</p>
        <b className="formula-down" style={{ backgroundColor: themeColor }}>
          {node.A}
          {node.D}
        </b>
      </div>
      <span className="equalizer">=</span>
      <div className="ac-side">
        <b className="formula-up" style={{ backgroundColor: themeColor }}>
          {node.A}
          {node.C}
        </b>
        <p className="formula-divider">───</p>
        <b className="formula-down" style={{ backgroundColor: themeColor }}>
          {node.A}
          {node.E}
        </b>
      </div>
      <span className="equalizer">=</span>
      <div className="bc-side">
        <b className="formula-up" style={{ backgroundColor: themeColor }}>
          {node.B}
          {node.C}
        </b>
        <p className="formula-divider">───</p>
        <b className="formula-down" style={{ backgroundColor: themeColor }}>
          {node.D}
          {node.E}
        </b>
      </div>
    </div>
  </div>
);

Formula.propTypes = {
  t: PropTypes.func.isRequired,
  themeColor: PropTypes.string.isRequired,
  node: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  node: state.simulation.node,
  themeColor: state.layout.themeColor,
});

export default connect(mapStateToProps)(Formula);
