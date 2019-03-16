import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const gridStyles = theme => ({
  plain:
  {
    margin: '0 !important',
    width: 'auto'
  }
});

function GridContainer(props) {
  const { classes, className, children, plain, ...rest } = props;

  const gridMarginClasses = classNames({
    [classes.plain]: plain,
    [className]: className !== undefined
  });
  
  return (
    <Grid container {...rest} spacing={24} className={gridMarginClasses}>
      {children}
    </Grid>
  );
}

GridContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  plain: PropTypes.bool,
};

export default withStyles(gridStyles)(GridContainer);
