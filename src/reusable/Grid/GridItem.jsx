import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const style = {
  grid: {
    padding: "2rem",
    textAlign: 'left'
  },
  gridPlain: {
    padding: '0 !important'
  },
  noPaddingTop: {
    paddingTop: '0 !important'
  },
  noPaddingBottom: {
    paddingBottom: '0 !important'
  }
};

function GridItem({ ...props }) {
  const { classes, className, children, plain, pt0, pb0, ...rest } = props;
  const gridItemClasses = classNames({
    [classes.grid]: true,
    [classes.gridPlain]: plain,
    [classes.noPaddingTop]: pt0,
    [classes.noPaddingBottom]: pb0,
    [className]: className !== undefined
  });
  return (
    <Grid item className={gridItemClasses} {...rest}>
      {children}
    </Grid>
  );
}

GridItem.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  plain: PropTypes.bool,
  pt0: PropTypes.bool,
  pb0: PropTypes.bool,
};

export default withStyles(style)(GridItem);
