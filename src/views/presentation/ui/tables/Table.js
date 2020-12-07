import React, { PureComponent } from "react";
import { TableStyle } from "./styles";

class UITable extends PureComponent {
  state = {
    selectedRowKeys: this.props.selectedRowKeys || [], // take selectedRowKeys props from outside
  };

  onSelectChange = (selectedRowKeys) => {
    // if props is controlled from outside, don't setState
    if (!this.props.selectedRowKeys) {
      this.setState({ selectedRowKeys });
    }
    this.props.handleRowSelect(selectedRowKeys);
  };

  onTableChange = (pagination, filters, sorter) => {
    // return row state to outside

    const pagi = {
      ...pagination,
      current: pagination.current - 1,
    };

    this.props.handleTableChange(pagi, filters, sorter);
  };

  render() {
    const {
      data,
      columns,
      pagination,
      loading,
      rowSelectable,
      footer,
      rowKey,
      ...rest
    } = this.props;

    // to control selected row state from outside
    const selectedRowKeys = this.props.selectedRowKeys
      ? this.props.selectedRowKeys
      : this.state.selectedRowKeys;

    const rowSelection = rowSelectable
      ? {
          selectedRowKeys,
          onChange: this.onSelectChange,
        }
      : null;

    const tablePaging = pagination
      ? {
          ...pagination,
          current: pagination.current,
        }
      : false;

    return (
      <TableStyle
        columns={columns}
        rowKey={(record) => record[rowKey]}
        dataSource={data}
        pagination={tablePaging}
        loading={loading}
        onChange={this.onTableChange}
        locale={{ emptyText: "Empty data" }}
        rowSelection={rowSelection}
        footer={footer}
        {...rest}
      />
    );
  }
}

UITable.defaultProps = {
  rowSelectable: false,
  rowKey: "_id",
};

export default UITable;
