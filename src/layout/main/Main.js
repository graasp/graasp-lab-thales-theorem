import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Fab from '@material-ui/core/Fab';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Stage } from 'react-konva';
import Styles from '../sidemenu/Styles';
import { AppState } from '../../config/AppState';
import { toggleSideMenu } from '../../actions';
import Triangle from '../../components/Triangle';


const styles = Styles;

class Main extends Component {
  state = AppState;

  handleToggleSideMenu = open => () => {
    const { dispatchToggleSideMenu } = this.props;
    dispatchToggleSideMenu(open);
  }

  render() {
    const {
      classes,
      showHeader,
      showSideMenu,
      themeColor,
      t,
    } = this.props;

    const {
      color,
      node,
      points,
      width,
      height,
      circleStroke,
      fontSize,
      radius,
      strokeWidth,
      shadowBlur,
    } = this.state;

    return (
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: showSideMenu,
        })}
      >
        { showHeader ? (
          <div className={classes.drawerHeader} />
        ) : ''
        }
        { showHeader ? ''
          : (
            <Fab
              color="primary"
              aria-label="Add"
              onClick={this.handleToggleSideMenu(!showSideMenu)}
              className={classes.fab}
              style={{ backgroundColor: themeColor, outline: 'none' }}
            >
              { showSideMenu ? <ChevronRightIcon /> : <MenuIcon style={{ color: 'white' }} /> }
            </Fab>
          )
        }

        <div className="main-container">
          <Stage width={width} height={height}>
            <Triangle
              circleStroke={circleStroke}
              strokeWidth={strokeWidth}
              color={color}
              node={node}
              fontSize={fontSize}
              radius={radius}
              shadowBlur={shadowBlur}
              points={
                [
                  { x: points[0].x, y: points[0].y },
                  { x: points[1].x, y: points[1].y },
                  { x: points[2].x, y: points[2].y },
                  { x: points[3].x, y: points[3].y },
                  { x: points[4].x, y: points[4].y },
                  { x: points[5].x, y: points[5].y },
                ]
              }
              t={t}
            />
          </Stage>
        </div>
      </main>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  themeColor: PropTypes.string.isRequired,
  showHeader: PropTypes.bool.isRequired,
  showSideMenu: PropTypes.bool.isRequired,
  dispatchToggleSideMenu: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.layout.themeColor,
  showHeader: state.layout.showHeader,
  showSideMenu: state.layout.showSideMenu,
});

const mapDispatchToProps = {
  dispatchToggleSideMenu: toggleSideMenu,
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Main);

export default withStyles(styles, { withTheme: true })(connectedComponent);
