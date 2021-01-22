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
                Cliquer sur un point et tirer la ligne vers un autre point
                afin de décrire le Théorème de Thalès!
              </p>
            </div>
          )}

          {
            this.checkCondition(fractionCheck === null, null,
              this.checkCondition(fractionCheck,
                <div className="successMessage alert alert-success m-3">
                  <h3>Félicitations !</h3>
                  <p>Bravo, le rapport de proportionnalité est correcte.</p>
                </div>,
                <div className="successMessage alert alert-danger m-3">
                  <h3>Erreur !</h3>
                  <p>Desolé, le rapport de proportionnalité est incorrecte.</p>
                </div>))
          }

          <div className="container">
            {theoremApplicable.status && (
              <div className="createMessage p-3">
                <h3>Théorème de Thalès applicable</h3>
                <p>
                  Félicitations, les conditions requises pour appliquer le
                  Théorème de Thalès sont respectées!
                </p>
                <p>
                  <CreateFormula />
                </p>
              </div>
            )}

            {theoremApplicable.status === false
              && secondClickedPoint && (
              <div className="resultMessage alert alert-danger mt-3">
                <h3>Théorème de Thalès non applicable</h3>
                <p>
                  Désoler, les conditions requises pour appliquer le Théorème de
                  Thalès ne sont pas respectées!
                  <Button color="secondary" onClick={this.restartLab}>
                    <ReplayIcon />
                    Reprendre
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
