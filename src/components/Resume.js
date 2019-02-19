import React from 'react';
import PropTypes from 'prop-types';

const Resume = ({
  t,
}) => (
  <div className="resume-container">
    <h1>{t('Description')}</h1>
    <p className="description-definition">
      {t('Lab Explanation')}
    </p>
  </div>
);

Resume.propTypes = {
  t: PropTypes.func.isRequired,
};
export default Resume;
