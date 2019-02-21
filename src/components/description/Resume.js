import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Resume = ({
  node,
  t,
}) => (
  <div className="resume-container">
    <h1>{t('Description')}</h1>
    <p className="description-definition">
      {t('Lab Explanation')}
    </p>
    <div className="text-center">
      <div className="ab-side">
        <b className="formula-up">
          {node.A}
          {node.B}
        </b>
        <p className="formula-divider">
          ───
        </p>
        <b className="formula-down">
          {node.A}
          {node.D}
        </b>
      </div>
      <div className="ac-side">
        <b className="formula-up">
          {node.A}
          {node.C}
        </b>
        <p className="formula-divider">
          ───
        </p>
        <b className="formula-down">
          {node.A}
          {node.E}
        </b>
      </div>
      <div className="bc-side">
        <b className="formula-up">
          {node.B}
          {node.C}
        </b>
        <p className="formula-divider">
          ───
        </p>
        <b className="formula-down">
          {node.D}
          {node.E}
        </b>
      </div>
    </div>
  </div>
);

Resume.propTypes = {
  t: PropTypes.func.isRequired,
  node: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  node: state.simulation.node,
});

export default connect(mapStateToProps)(Resume);
