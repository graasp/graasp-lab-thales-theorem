import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import Description from '../../components/description/Description';
import Button from '@material-ui/core/Button';
import CreateFormula from '../../components/formula';
import Styles from './Styles';
import { toggleSideMenu } from '../../actions';

const styles = Styles;

class SideMenu extends Component {
  handleToggleSideMenu = open => () => {
    const { dispatchToggleSideMenu } = this.props;
    dispatchToggleSideMenu(open);
  }

  checkCondition = (condition, then, otherwise) => (condition ? then : otherwise)

  // Lab restart
  restartLab = () => {
    window.location.reload();
    /* const { reset, resetFractionSpot, clickOnPoints } = this.props;
    this.setState({ ...initialState }, () => {
      reset();
      resetFractionSpot();
      clickOnPoints({
        secondClickedPoint: null,
        secondClickedPointRef: null,
      });
    }); */
  }

  render() {
    const {
      classes,
      theme,
      showSideMenu,
      // node,
      clickPoints,
      theoremApplicable,
      fractionCheck,
      t,
    } = this.props;

    const { secondClickedPoint } = clickPoints;

    return (
      <Fragment>
        <CssBaseline />
        <Drawer
          id="sideMenu"
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={showSideMenu}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleToggleSideMenu(false)} style={{ outline: 'none' }}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            <h3>{t('Observe')}</h3>
          </div>
          <Divider />
          {/* <Description t={t} node={node} /> */}

          {!secondClickedPoint && (
            <div className="resultMessage p-3">
              <h3>Instructions</h3>
              <p>
                {t('Click on a point and drag the line to another point to describe Thales\'s theorem!')}
              </p>
            </div>
          )}

          {
            this.checkCondition(fractionCheck === null, null,
              this.checkCondition(fractionCheck,
                <div className="successMessage alert alert-success m-3">
                  <h3>{t('Congratulation !')}</h3>
                  <p>{t('Good job, the proportionality ratio is correct.')}</p>
                </div>,
                <div className="successMessage alert alert-danger m-3">
                  <h3>{t('Error !')}</h3>
                  <p>{t('Sorry, the proportionality ratio is incorrect.')}</p>
                </div>))
          }

          <div className="container">
            {theoremApplicable.status && (
              <div className="createMessage p-3">
                <h3>{t('Applicable Thales Theorem')}</h3>
                <p>
                  {t('Congratulations, the conditions required to apply Thales Theorem have been met!')}
                </p>
                <p>
                  <CreateFormula />
                </p>
              </div>
            )}

            {theoremApplicable.status === false
              && secondClickedPoint && (
              <div className="resultMessage alert alert-danger mt-3">
                <h3>{t('Thales theorem not applicable')}</h3>
                <p>
                  {t('Sorry, the conditions required to apply Thales\'s Theorem are not met!')}
                  <Button color="secondary" onClick={this.restartLab}>
                    <ReplayIcon />
                    {t('Restart')}
                  </Button>
                </p>
              </div>
            )}
          </div>
        </Drawer>
      </Fragment>
    );
  }
}

SideMenu.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  theme: PropTypes.shape({}).isRequired,
  clickPoints: PropTypes.shape({}).isRequired,
  // node: PropTypes.shape({}).isRequired,
  t: PropTypes.func.isRequired,
  dispatchToggleSideMenu: PropTypes.func.isRequired,
  theoremApplicable: PropTypes.bool.isRequired,
  showSideMenu: PropTypes.bool.isRequired,
  fractionCheck: PropTypes.oneOf([null, PropTypes.bool]).isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.layout.themeColor,
  showHeader: state.layout.showHeader,
  showSideMenu: state.layout.showSideMenu,
  clickPoints: state.simulation.clickPoints,
  theoremApplicable: state.theoremCanApply,
  fractionCheck: state.simulation.fractionCheck,
});

const mapDispatchToProps = {
  dispatchToggleSideMenu: toggleSideMenu,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(SideMenu);

const StyledComponent = withStyles(styles, { withTheme: true })(ConnectedComponent);

export default withTranslation()(StyledComponent);
