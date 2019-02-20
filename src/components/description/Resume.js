import React from 'react';
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
          <span className="formula-equal">=</span>
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
          <span className="formula-equal">=</span>
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
      <h1 className="mesure-title">Mesures</h1>
      <div className="ab-side mesure-side">
        <b className="mesure-up">
          {node.A}
          {node.B}
        </b>
        <p className="mesure-divider">
          ──
          <span className="formula-equal">=</span>
        </p>
        <b className="mesure-down">
          {node.A}
          {node.D}
        </b>
      </div>
      <div className="ac-side">
        <b className="mesure-up">
          8
        </b>
        <p className="mesure-divider">
          ──
          <span className="formula-equal">=</span>
        </p>
        <b className="mesure-down">
          12
        </b>
      </div>
      <div className="bc-side">
        <b className="mesure-up">
          2
        </b>
        <p className="mesure-divider">
          ──
        </p>
        <b className="mesure-down">
          3
        </b>
      </div>
      <div className="ab-side">
        <b className="mesure-up">
          {node.A}
          {node.C}
        </b>
        <p className="mesure-divider">
          ──
          <span className="formula-equal">=</span>
        </p>
        <b className="mesure-down">
          {node.A}
          {node.E}
        </b>
      </div>
      <div className="ac-side mesure-side">
        <b className="mesure-up">
          10
        </b>
        <p className="mesure-divider">
          ──
          <span className="formula-equal">=</span>
        </p>
        <b className="mesure-down">
          15
        </b>
      </div>
      <div className="bc-side">
        <b className="mesure-up">
          2
        </b>
        <p className="mesure-divider">
          ──
        </p>
        <b className="mesure-down">
          3
        </b>
      </div>
      <div className="ab-side">
        <b className="mesure-up">
          {node.B}
          {node.C}
        </b>
        <p className="mesure-divider">
          ──
          <span className="formula-equal">=</span>
        </p>
        <b className="mesure-down">
          {node.B}
          {node.E}
        </b>
      </div>
      <div className="ac-side">
        <b className="mesure-up">
          8
        </b>
        <p className="mesure-divider">
          ──
          <span className="formula-equal">=</span>
        </p>
        <b className="mesure-down">
          12
        </b>
      </div>
      <div className="bc-side">
        <b className="mesure-up">
          2
        </b>
        <p className="mesure-divider">
          ──
        </p>
        <b className="mesure-down">
          3
        </b>
      </div>
    </div>
  </div>
);

Resume.propTypes = {
  t: PropTypes.func.isRequired,
  node: PropTypes.shape({}).isRequired,
};
export default Resume;
