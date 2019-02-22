import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Formula from './Formula';
import './Description.css';

const Description = ({ t }) => (
  <div className="description-container">
    {/* calling and displaying the formulas in our sidemenu */}
    <Formula t={t} />
  </div>
);

Description.propTypes = {
  t: PropTypes.func.isRequired,
  node: PropTypes.shape({}).isRequired,
};

export default withTranslation()(Description);
