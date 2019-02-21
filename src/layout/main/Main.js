import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Fab from '@material-ui/core/Fab';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Layer, Line, Stage } from 'react-konva';
import Styles from '../sidemenu/Styles';
import { AppState } from '../../config/AppState';
import { toggleSideMenu, toggleNode } from '../../actions';
import Triangle from '../../components/triangle/Triangle';
import CircleOne from '../../components/circles/CircleOne';
import CircleTwo from '../../components/circles/CircleTwo';
import { CANVAS_VIRTUAL_WIDTH, CANVAS_VIRTUAL_HEIGHT } from '../../config/constants';
import {
  color,
  circleStroke,
  strokeWidth,
  shadowBlur,
  fontSize,
  radius,
} from '../../config/properties';

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

  handleClick = (e, circleShape) => {
    const {
      isDrawingMode,
      circleOneShape,
      circleTwoShape,
      circleOnePoints,
      circleTwoPoints,
      points,
    } = this.state;
    if (!isDrawingMode) return;

    this.setState({ circleKind: circleShape });

    let shapes;
    // otherwise, add a new rectangle at the mouse position with 0 width and height,
    if (circleShape === 'circleOne') {
      const { dispatchNode } = this.props;
      const node = {
        A: 'A',
        B: 'B',
        C: 'C',
        D: 'D',
        E: 'E',
      };
      dispatchNode(node, false);
      shapes = circleOneShape;
      if (shapes.length <= 1) {
        shapes = [];
        this.setState({ circleOneShape: shapes });
      }
    } else {
      const { dispatchNode } = this.props;
      const node = {
        A: 'A',
        B: 'B',
        C: 'C',
        D: 'F',
        E: 'G',
      };
      dispatchNode(node, true);
      shapes = circleTwoShape;
      if (shapes.length <= 1) {
        shapes = [];
        this.setState({ circleTwoShape: shapes });
      }
    }

    const newX = circleShape === 'circleOne' ? circleOnePoints.x : circleTwoPoints.x;
    const newY = circleShape === 'circleOne' ? circleOnePoints.y : circleTwoPoints.y;
    const newHeight = circleShape === 'circleOne' ? circleOnePoints.y : circleTwoPoints.y;
    shapes.push({
      x: newX,
      y: newY,
      width: points[0].x,
      height: newHeight,
    });
    // if (circleShape === 'circleOne') this.setState({ circleOneShape: shapes });
    // if (circleShape === 'circleTwo') this.setState({ circleTwoShape: shapes });
  };

  handleDrawingMode = () => {
    const { isDrawingMode } = this.state;
    this.setState({ isDrawingMode: !isDrawingMode }); // toggle drawing mode
  };

  // this is currently not used since all the circles are not aligned
  handleDragMove = (e, i) => {
    const { points } = this.state;
    const newPoints = [...points];
    newPoints[i].x = e.target.x();
    newPoints[i].y = e.target.y();
    this.setState({ points: newPoints });
  };

  render() {
    const {
      classes,
      showHeader,
      showSideMenu,
      themeColor,
    } = this.props;

    const {
      node,
      points,
      circleOnePoints,
      circleTwoPoints,
      isMouseInside,
      circleOneShape,
      circleTwoShape,
      isDrawingMode,
      isDrawing,
      circleKind,
    } = this.state;

    const scale = Math.min(
      window.innerWidth / CANVAS_VIRTUAL_WIDTH,
      window.innerHeight / CANVAS_VIRTUAL_HEIGHT,
    );

    const circleToDraw = circleKind === 'circleOne' ? circleOneShape : circleTwoShape;

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
          <FormControlLabel
            control={(
              <Checkbox
                checked={isDrawingMode}
                onChange={this.handleDrawingMode}
                value="checkDrawer"
                style={{ color: themeColor }}
              />
            )}
            label="Drawing Mode"
          />
          <Stage
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
                points={points}
                stroke={isMouseInside ? themeColor : circleStroke}
                node={node}
                themeColor={themeColor}
                handleMouseLeave={this.handleMouseLeave}
                handleMouseEnter={this.handleMouseEnter}
                isDrawing={isDrawing}
                handleClick={e => this.handleClick(e, 'circleOne')}
              />
              {circleToDraw.map(shape => (
                <Line
                  points={
                    [
                      shape.x,
                      shape.y,
                      shape.width,
                      shape.height,
                    ]
                  }
                  stroke={themeColor}
                  strokeWidth={strokeWidth}
                />
              ))
              }
              <CircleTwo
                circleTwoPoints={circleTwoPoints}
                stroke={isMouseInside ? themeColor : circleStroke}
                points={points}
                node={node}
                themeColor={themeColor}
                handleMouseLeave={this.handleMouseLeave}
                handleMouseEnter={this.handleMouseEnter}
                handleClick={e => this.handleClick(e, 'circleTwo')}
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
  dispatchNode: PropTypes.func.isRequired,
  dispatchToggleSideMenu: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.layout.themeColor,
  showHeader: state.layout.showHeader,
  showSideMenu: state.layout.showSideMenu,
  node: state.simulation.node,
  nodeStatus: state.simulation.nodeStatus,
});

const mapDispatchToProps = {
  dispatchToggleSideMenu: toggleSideMenu,
  dispatchNode: toggleNode,
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Main);

export default withStyles(styles, { withTheme: true })(connectedComponent);
