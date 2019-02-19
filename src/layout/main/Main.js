import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Fab from '@material-ui/core/Fab';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Layer, Stage } from 'react-konva';
import Styles from '../sidemenu/Styles';
import { AppState } from '../../config/AppState';
import { toggleSideMenu } from '../../actions';
import Triangle from '../../components/Triangle';
import CircleOne from '../../components/circles/CircleOne';
import CircleTwo from '../../components/circles/CircleTwo';
import { CANVAS_VIRTUAL_WIDTH, CANVAS_VIRTUAL_HEIGHT } from '../../config/constants';


const styles = Styles;

class Main extends Component {
  state = AppState;

  handleToggleSideMenu = open => () => {
    const { dispatchToggleSideMenu } = this.props;
    dispatchToggleSideMenu(open);
  }

  handleMouseEnter = () => {
    document.body.style.cursor = 'pointer';
    this.setState({ isMouseInside: true });
  }

  handleMouseLeave = () => {
    document.body.style.cursor = 'default';
    this.setState({ isMouseInside: false });
  }

  render() {
    const {
      classes,
      showHeader,
      showSideMenu,
      themeColor,
    } = this.props;

    const {
      color,
      node,
      points,
      circleOnePoints,
      circleTwoPoints,
      circleStroke,
      fontSize,
      radius,
      strokeWidth,
      shadowBlur,
      lineStrokeWidth,
      isMouseInside,
    } = this.state;

    const scale = Math.min(
      window.innerWidth / CANVAS_VIRTUAL_WIDTH,
      window.innerHeight / CANVAS_VIRTUAL_HEIGHT,
    );

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
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            scalex={scale}
            scaley={scale}
          >
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
                ]
              }
            />
            <Layer>
              <CircleOne
                circleOnePoints={circleOnePoints}
                strokeWidth={strokeWidth}
                shadowBlur={shadowBlur}
                fill={themeColor}
                points={points}
                stroke={isMouseInside ? themeColor : circleStroke}
                node={node}
                lineStrokeWidth={lineStrokeWidth}
                themeColor={themeColor}
                handleMouseLeave={this.handleMouseLeave}
                handleMouseEnter={this.handleMouseEnter}
                fontSize={fontSize}
              />
              <CircleTwo
                circleTwoPoints={circleTwoPoints}
                stroke={isMouseInside ? themeColor : circleStroke}
                strokeWidth={strokeWidth}
                shadowBlur={shadowBlur}
                fill={themeColor}
                points={points}
                node={node}
                lineStrokeWidth={lineStrokeWidth}
                themeColor={themeColor}
                handleMouseLeave={this.handleMouseLeave}
                handleMouseEnter={this.handleMouseEnter}
                fontSize={fontSize}
              />
            </Layer>
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
