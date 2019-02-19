import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Resume from './Resume';
import './Description.css';

const Description = ({ node, t }) => (
  <div className="description-container">
    <Resume t={t} node={node} />
  </div>
);

Description.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Description);
