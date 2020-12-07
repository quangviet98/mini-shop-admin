import React from "react";
import { Button, Popconfirm, Icon } from "antd";
import { UITable } from "../../../presentation/ui/tables";
import enhancer from "./withEnhancer";
import styled from "styled-components";
import * as PATH from "../../../../configs/routesConfig";
import { IMAGES_URL } from "../../../../configs";

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

const ListProduct = (props) => {
  const { reducer, history, handleDeleteProduct, categorires } = props;

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
      title: "Hình ảnh",
      dataIndex: "ImageUrl",
      render: (record) => {
        return (
          <img style={{ maxWidth: "60px" }} src={`${IMAGES_URL}${record}`} />
        );
      },
    },
    {
      title: "Danh mục ",
      dataIndex: "CategoryId",
      render: (record) => {
        return <div> {categorires[record]}</div>;
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
      title: "Giá",
      dataIndex: "Price",
      render: (record) => {
        return <div> {record}</div>;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "Quantity",
      render: (record) => {
        return <div> {record}</div>;
      },
    },
    {
      title: "Action",
      render: (record, row) => {
        return (
          <div className="d-flex flex-row justify-content-start">
            <UIButton
              color="#ff9800"
              size="small"
              ghost
              className="mr-1"
              onClick={() =>
                history.push(PATH.UPDATE_PRODUCT_PATH.replace(":id", row.Id))
              }
            >
              Sửa
            </UIButton>

            <Popconfirm
              title="Bạn có chắc muốn xóa sản phẩm này?"
              onConfirm={() => handleDeleteProduct(row.Id)}
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
        <h3 className="page-title">Products</h3>
        <Button
          type="primary"
          onClick={() => history.push(PATH.CREATE_PRODUCT_PATH)}
        >
          <span className="d-flex flex-row justify-content-md-between align-items-center">
            <Icon type="plus" className="mr-1" />
            <span>Thêm sản phẩm</span>
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

export default enhancer(ListProduct);
