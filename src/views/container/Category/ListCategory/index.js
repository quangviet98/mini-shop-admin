import { Button, Popconfirm, Icon } from "antd";
import React from "react";
import { UITable } from "../../../presentation/ui/tables";
import enhancer from "./withEnhancer";
import styled from "styled-components";
import * as PATH from "../../../../configs/routesConfig";

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

const ListCategory = (props) => {
  const { reducer, history, handleDeleteCategory } = props;
  const { loading, query, data, total } = reducer;

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
    {
      title: "Mô tả",
      dataIndex: "Description",
      render: (record) => {
        return <div> {record}</div>;
      },
    },
    {
      title: "Action",
      render: (record, row) => {
        return (
          <div className="d-flex flex-row justify-content-center">
            <UIButton
              color="#ff9800"
              size="small"
              ghost
              className="mr-1"
              onClick={() =>
                history.push(PATH.UPDATE_CATEGORY_PATH.replace(":id", row.Id))
              }
            >
              Sửa
            </UIButton>

            <Popconfirm
              title="Bạn có chắc muốn xóa danh mục này?"
              onConfirm={() => handleDeleteCategory(row.Id)}
              okText="Yes"
              cancelText="No"
            >
              <UIButton color="#ed5757" size="small" ghost>
                Xóa
              </UIButton>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <React.Fragment>
      <div className="d-flex flex-row justify-content-md-between">
        <h3 className="page-title">Categories</h3>
        <Button
          type="primary"
          onClick={() => history.push(PATH.CREATE_CATEGORY_PATH)}
        >
          <span className="d-flex flex-row justify-content-md-between align-items-center">
            <Icon type="plus" className="mr-1" />
            <span>Thêm danh mục</span>
          </span>
        </Button>
      </div>
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

export default enhancer(ListCategory);
