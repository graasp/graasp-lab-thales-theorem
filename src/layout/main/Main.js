import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
// import IconButton from '@material-ui/core/IconButton';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Fab from '@material-ui/core/Fab';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Layer, Line, Stage } from 'react-konva';
import Styles from '../sidemenu/Styles';
import './Main.css';
import { AppState } from '../../config/AppState';
import {
  reset as resetLab,
  resetFractionSpot as resetLabFractionSpot,
  toggleSideMenu,
  toggleNode,
  clickOnPoints,
  checkFraction,
  applyTheorem as theoremApply,
  dontApplyTheorem as theoremDontApply,
} from '../../actions';
import Triangle from '../../components/triangle/Triangle';
import CircleOne from '../../components/circles/CircleOne';
import CircleTwo from '../../components/circles/CircleTwo';
import {
  CANVAS_VIRTUAL_WIDTH,
  CANVAS_VIRTUAL_HEIGHT,
} from '../../config/constants';
import {
  color,
  circleStroke,
  strokeWidth,
  shadowBlur,
  fontSize,
  radius,
  textSize,
} from '../../config/properties';

const styles = Styles;
const initialState = {
  firstClickedPointRef: null,
  firstClickedPoint: null,
  secondClickedPoint: null,
  secondClickedPointRef: null,
  mouseMoving: null,
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...AppState,
      ...initialState,
    };
  }

  handleToggleSideMenu = open => () => {
    const { dispatchToggleSideMenu } = this.props;
    dispatchToggleSideMenu(open);
  };

  // called when any circle is clicked to draw the line
  handleClick = (e) => {
    const { firstClickedPoint } = this.state;
    const {
      applyTheorem, dontApplyTheorem, dispatchClickOnPoints, dispatchToggleSideMenu,
    } = this.props;

    const { x, y } = e.target.attrs;
    if (firstClickedPoint) {
      // One circle has already been clicked
      // Open the drawer here...
      dispatchToggleSideMenu(true);
      this.setState(
        {
          secondClickedPoint: {
            x: x - firstClickedPoint.x,
            y: y - firstClickedPoint.y,
          },
          secondClickedPointRef: e.target,
        },
        () => {
          const { secondClickedPoint, secondClickedPointRef } = this.state;
          dispatchClickOnPoints({
            secondClickedPoint: {
              x: x - firstClickedPoint.x,
              y: y - firstClickedPoint.y,
            },
            secondClickedPointRef: e.target,
          });

          if (
            secondClickedPoint
            && secondClickedPoint.y === 0
            && secondClickedPoint.x !== 0
          ) {
            /* const theoremApplicationCircle = secondClickedPointRef.attrs.y === 250 ?
            'circleOne' : secondClickedPointRef.attrs.y === 400 ? 'circleTwo' : null; */
            const thCondition = (condition, then, otherwise) => (condition ? then : otherwise);
            const theoremApplicationCircle = (thCondition(secondClickedPointRef.attrs.y === 250, 'circleOne', null)
            || thCondition(secondClickedPointRef.attrs.y === 400, 'circleTwo', null));
            applyTheorem(theoremApplicationCircle);
          } else {
            dontApplyTheorem();
          }
        },
      );
    } else {
      // The circle has been clicked for the first time
      this.setState({
        firstClickedPointRef: e.target,
        firstClickedPoint: { x, y },
        mouseMoving: { x: 0, y: 0 },
      });
    }
  };

  // Method to execute when mouse is moving on the canvas
  handleStageMove = (e) => {
    const { firstClickedPointRef } = this.state;

    const node = firstClickedPointRef || e.target;
    const transform = node.getAbsoluteTransform().copy();
    transform.invert();
    const pos = node.getStage().getPointerPosition();
    const { x, y } = transform.point(pos);
    this.setState({ mouseMoving: { x, y } });
  };

  checkFraction = () => {
    const { theoremApplicable, fraction, dispatchCheckFraction } = this.props;

    if (
      !fraction.fraction1_spot1
      || !fraction.fraction1_spot2
      || !fraction.fraction2_spot1
      || !fraction.fraction2_spot2) {
      dispatchCheckFraction(null);
      return null;
    }

    if (theoremApplicable.circleChoosed && theoremApplicable.circleChoosed === 'circleOne') {
      if (
        ((fraction.fraction1_spot1 === 'AD' && fraction.fraction1_spot2 === 'AB')
        || (fraction.fraction1_spot1 === 'DE' && fraction.fraction1_spot2 === 'BC'))
        && ((fraction.fraction2_spot1 === 'DE' && fraction.fraction2_spot2 === 'BC')
        || (fraction.fraction2_spot1 === 'AD' && fraction.fraction2_spot2 === 'AB'))
      ) {
        dispatchCheckFraction(true);
        return true;
      }
      dispatchCheckFraction(false);
      return false;
    }
    if (theoremApplicable.circleChoosed && theoremApplicable.circleChoosed === 'circleTwo') {
      if (
        ((fraction.fraction1_spot1 === 'AF' && fraction.fraction1_spot2 === 'AB')
        || (fraction.fraction1_spot1 === 'FG' && fraction.fraction1_spot2 === 'BC'))
        && ((fraction.fraction2_spot1 === 'FG' && fraction.fraction2_spot2 === 'BC')
        || (fraction.fraction2_spot1 === 'AF' && fraction.fraction2_spot2 === 'AB'))
      ) {
        dispatchCheckFraction(true);
        return true;
      }
      dispatchCheckFraction(false);
      return false;
    }
    dispatchCheckFraction(null);
    return null;
  }

  render() {
    const {
      classes,
      showHeader,
      showSideMenu,
      themeColor,
      nodeStatus,
      // theoremApplicable,
      // fraction,
    } = this.props;

    const {
      node,
      points,
      circleOnePoints,
      circleTwoPoints,
      isMouseInside,
      firstClickedPoint,
      secondClickedPoint,
      mouseMoving,
    } = this.state;

    const scale = Math.min(
      window.innerWidth / CANVAS_VIRTUAL_WIDTH,
      window.innerHeight / CANVAS_VIRTUAL_HEIGHT,
    ) - 0.15;

    return (
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: showSideMenu,
        })}
      >
        {showHeader ? <div className={classes.drawerHeader} /> : ''}
        {showHeader ? (
          ''
        ) : (
          <Fab
            color="primary"
            aria-label="Add"
            onClick={this.handleToggleSideMenu(!showSideMenu)}
            className={classes.fab}
            style={{ backgroundColor: themeColor, outline: 'none' }}
          >
            {showSideMenu ? (
              <ChevronRightIcon />
            ) : (
              <MenuIcon style={{ color: 'white' }} />
            )}
          </Fab>
        )}

        <div className="main-container">
          {/* <Button variant="outlined" color="secondary" onClick={this.restartLab}>
            <ReplayIcon />
            Reprendre
          </Button> */}

          {this.checkFraction()}

          <Stage
            onMouseMove={this.handleStageMove}
            width={window.innerWidth}
            height={window.innerHeight}
            scaleX={scale}
            scaleY={scale}
          >
            <Triangle
              circleStroke={circleStroke}
              strokeWidth={strokeWidth}
              color={color}
              node={node}
              fontSize={fontSize}
              textSize={textSize}
              radius={radius}
              shadowBlur={shadowBlur}
              points={[
                { x: points[0].x, y: points[0].y },
                { x: points[1].x, y: points[1].y },
                { x: points[2].x, y: points[2].y },
              ]}
            />
            <Layer>
              <CircleOne
                circleOnePoints={circleOnePoints}
                points={points}
                stroke={isMouseInside ? themeColor : circleStroke}
                node={node}
                themeColor={themeColor}
                handleMouseLeave={this.handleMouseLeave}
                handleMouseEnter={this.handleMouseEnter}
                handleClick={e => this.handleClick(e, 'circleOne')}
                nodeStatus={nodeStatus}
              />
              {firstClickedPoint && (
                <Line
                  x={firstClickedPoint.x}
                  y={firstClickedPoint.y}
                  points={[
                    0,
                    0,
                    secondClickedPoint ? secondClickedPoint.x : mouseMoving.x,
                    secondClickedPoint ? secondClickedPoint.y : mouseMoving.y,
                  ]}
                  stroke="#2196f3"
                />
              )}
              <CircleTwo
                circleTwoPoints={circleTwoPoints}
                stroke={isMouseInside ? themeColor : circleStroke}
                points={points}
                node={node}
                themeColor={themeColor}
                handleMouseLeave={this.handleMouseLeave}
                handleMouseEnter={this.handleMouseEnter}
                handleClick={e => this.handleClick(e, 'circleTwo')}
                nodeStatus={nodeStatus}
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
  dispatchClickOnPoints: PropTypes.func.isRequired,
  dispatchCheckFraction: PropTypes.func.isRequired,
  nodeStatus: PropTypes.func.isRequired,
  // reset: PropTypes.func.isRequired,
  // resetFractionSpot: PropTypes.func.isRequired,
  applyTheorem: PropTypes.func.isRequired,
  dontApplyTheorem: PropTypes.func.isRequired,
  fraction: PropTypes.shape({}).isRequired,
  theoremApplicable: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.layout.themeColor,
  showHeader: state.layout.showHeader,
  showSideMenu: state.layout.showSideMenu,
  node: state.simulation.node,
  nodeStatus: state.simulation.nodeStatus,
  theoremApplicable: state.theoremCanApply,
  fraction: state.fraction,
});

const mapDispatchToProps = {
  dispatchToggleSideMenu: toggleSideMenu,
  dispatchNode: toggleNode,
  applyTheorem: theoremApply,
  dontApplyTheorem: theoremDontApply,
  reset: resetLab,
  resetFractionSpot: resetLabFractionSpot,
  dispatchClickOnPoints: clickOnPoints,
  dispatchCheckFraction: checkFraction,
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Main);

export default withStyles(styles, { withTheme: true })(connectedComponent);
