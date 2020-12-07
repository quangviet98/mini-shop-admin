import { Button, Popconfirm } from "antd";
import React from "react";
import { UITable } from "../../../presentation/ui/tables";
import enhancer from "./withEnhancer";
import styled from "styled-components";

const UIButton = styled(Button)`
  color: ${(props) =>
    (props.color && props.color + " !important") || "primary"};
  border-color: ${(props) =>
    (props.color && props.color + " !important") || "primary"};

  &:hover {
    color: ${(props) =>
      (props.color && props.color + " !important") || "primary"};
    border-color: ${(props) =>
      (props.color && props.color + " !important") || "primary"};
  }
`;

const columns = [
  {
    title: "id",
    dataIndex: "Id",
    render: (record) => {
      return <div> {record}</div>;
    },
  },
  {
    title: "Tên",
    dataIndex: "Name",
    render: (record) => {
      return <div> {record}</div>;
    },
  },
];

const ListRole = (props) => {
  const { reducer } = props;
  const { loading, query, data, total } = reducer;
  return (
    <React.Fragment>
      <h3 className="page-title">Roles</h3>
      <div className="card">
        <UITable
          rowKey="id"
          columns={columns}
          loading={loading}
          dataSource={data}
        />
      </div>
    </React.Fragment>
  );
};

export default enhancer(ListRole);
