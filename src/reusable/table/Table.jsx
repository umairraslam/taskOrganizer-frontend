import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from '@material-ui/core/TableFooter';

import TablePagination from '@material-ui/core/TablePagination';

const util = require("../../util/util");
const tableStyle = theme => ({

  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse"
  },
  tableHeadCell: {
   /* fontSize: "0.75rem !important",
    padding: "0.4rem 1rem !important",
    fontWeight: '500' */
  },
  tableCell: {
    padding: "0 1rem",
    textOverflow: 'ellipsis'
  },
  tableHeadCellBorder: {
    borderLeft: '1px solid rgba(224, 224, 224, 1)',
    '&:first-child': {
      borderLeft: 'none'
    },
    '&:last-child': {
      borderRight: 'none'
    }
  },
  tableResponsive: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  compactRow: {
    height: 0,
  },
  compactCell: {
    /* padding: 0,
    width: "100%" */
    padding: '0.5rem'
  },
  tableCellRemoveBottomBorder: {
    borderBottom: "none"
  },
  tableCenter: {
    padding: "0 40px",
    display: "flex",
    width: "75%"
  },
  tablePlain: {
    boxShadow: "none"
  },
  tableCellForm: {
    width: "0%",
  },
  footer: {
    display: 'contents'
  },
  tableCellLeft: {
    textAlign: 'left'
  },
  tableCellCentered: {
    textAlign: 'center'
  },
  tableCellRight: {
    textAlign: 'right',
    '&:first-child': {//incase index(1,2,3...) column and is aligned right
      textAlign: 'center',
    }
  },
  tableCellBordered: {
    border: '1px solid rgba(224, 224, 224, 1)',
    '&:first-child': {
      borderLeft: 'none'
    },
    '&:last-child': {
      borderRight: 'none'
    }
  },
  hover: {
    cursor: 'pointer'
  }

});

class CustomTable extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      page: 0,
      rowsPerPage: 10,
      selected: [],
    };

  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  updatedData(rowsData, page, rowsPerPage) {
    return rowsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleClick = (event, id) => {
    if (this.props.selectAction) {
      this.props.select(id);
    } else {
      const { selected } = this.state;
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }

      this.setState({ selected: newSelected });
    }
  };

  getTableCell(cellData, cellKey, classes) {
    let tableHeadCLasses = classNames({
      [classes.tableHeadCell]: true,
      [classes.tableCell]: true,
      [classes.tableCellCentered]: this.props.textCenter,
      [classes.tableHeadCellBorder]: (this.props.headBorder && (cellData.val !== undefined ? cellData.val !== "" && cellData.val !== " " : cellData !== "" && cellData !== " ")),
      [this.props.className]: this.props.className !== undefined
    });
    return (
      <TableCell
        className={tableHeadCLasses}
        key={cellKey}
        colSpan={util.isNotNULL(cellData.cs) ? cellData.cs : 1}
      >
        {util.isNotNULL(cellData.val) ? cellData.val : cellData}
      </TableCell>
    );
  }

  render() {
    const { classes, className, tableHead, tableData, plain, selectAction, select,
      center, grayRow, compactRow, compactCell, noBottomBorder, form, pagination, alignment, cellBordered } = this.props;
    const { rowsPerPage, page } = this.state;
    const tableClasses = classNames({
      [classes.table]: true,
      [classes.tablePlain]: plain,
      [classes.tableCenter]: center,
      [className]: className !== undefined
    });
    const tableRowClasses = classNames({
      [classes.row]: grayRow,
      [classes.hover]: selectAction ? true : false,
      [classes.compactRow]: compactRow,
      [className]: className !== undefined
    });
    const tableCellClasses = classNames({
      [classes.tableCell]: true,
      /* [classes.tableCellCentered]: textCenter, */
      [classes.tableCellBordered]: cellBordered,
      [classes.compactCell]: compactCell,
      [classes.tableCellRemoveBottomBorder]: noBottomBorder,
      [classes.tableCellForm]: form,
      [className]: className !== undefined
    });

    let tableDataRows = pagination ? this.updatedData(tableData, page, rowsPerPage) : tableData;

    return (
      <div>
        {this.props.legend ? this.props.legend : null}
        <div style={{ overflow: 'hidden', overflowX: 'auto' }}>
          <Table className={tableClasses}>
            {tableHead !== undefined ? (
              <TableHead>
                {tableHead[1] instanceof Array ? (
                  tableHead.map((prop, key) => {
                    return (
                      <TableRow>
                        {prop.map((prop, key) => {
                          return this.getTableCell(prop, key, classes)
                        })}
                      </TableRow>
                    );
                  })) :
                  <TableRow>
                    {tableHead.map((prop, key) => {
                      return this.getTableCell(prop, key, classes)
                    })}
                  </TableRow>
                }
              </TableHead>
            ) : null}
            <TableBody>
              {tableDataRows.map((prop, key) => {
                const isSelected = selectAction ? false : select ? this.isSelected(key) : false;
                return (
                  <TableRow hover={selectAction ? true : false} onClick={select ? event => this.handleClick(event, key) : false}
                    className={tableRowClasses} key={key} selected={isSelected} >
                    {prop.map((prop, key) => {
                      let cellClasses = alignment ?
                        tableCellClasses + " " + (util.isNumeric(prop) ? classes.tableCellRight : util.isText(prop) ? classes.tableCellLeft : classes.tableCellCentered)
                        : tableCellClasses;
                      return (
                        <TableCell className={cellClasses} key={key} colSpan={util.isNotNULL(prop) && util.isNotNULL(prop.cs) ? prop.cs : 1} >
                          {util.isNotNULL(prop) && util.isNotNULL(prop.val) ? prop.val : prop}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              {/* {pagination && emptyRows > 0 && (
                <TableRow style={{ height: 45 * emptyRows }}>
                  <TableCell colSpan={tableHead.length} />
                </TableRow>
              )} */}
            </TableBody>
            {this.props.children}
          </Table>
        </div>
        {pagination ?
          <TableFooter className={classes.footer}>
            <TablePagination
              component="div"
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </TableFooter> : null
        }
      </div>
    );
  }
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  plain: PropTypes.bool,
  center: PropTypes.bool,
  grayRow: PropTypes.bool,
  compactRow: PropTypes.bool,
  compactCell: PropTypes.bool,
  noBottomBorder: PropTypes.bool,
  form: PropTypes.bool,
  headBorder: PropTypes.bool,
  pagination: PropTypes.bool,
  textCenter: PropTypes.bool,
  cellBordered: PropTypes.bool,
  alignment: PropTypes.bool,
  select: PropTypes.func,
  selectAction: PropTypes.bool,
};

export default withStyles(tableStyle)(CustomTable);
