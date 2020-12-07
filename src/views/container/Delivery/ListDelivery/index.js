import React from "react";
import { Button, Icon, Modal, Popconfirm, Select, Tag, Tooltip } from "antd";
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
const UISelect = styled(Select)`
  .ant-select-selection--multiple .ant-select-selection__choice {
    background-color: #9ce1f9;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;
const ListOrders = (props) => {
  const { reducer, handleConfirm, setVisible, setIdOrder } = props;
  const { loading, query, data, total } = reducer;

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "Id",
      render: (record) => {
        return <div> {record}</div>;
      },
    },
    {
      title: "Người đặt",
      dataIndex: "HOTEN",
      render: (record) => {
        return <div> {record}</div>;
      },
    },
    {
      title: "Ngày đặt",
      dataIndex: "CreateTime",
      render: (record) => {
        return <div> {record}</div>;
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "SDT_DL",
      render: (record) => {
        return <div> {record}</div>;
      },
    },
    {
      title: "Người giao hàng",
      dataIndex: "HOTEN_DL",
      render: (record, row) => {
        return <div> {record}</div>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "Status",
      render: (record, row) => {
        switch (row.Status_code) {
          case "P":
            return <Tag color="#108ee9">Đang chờ</Tag>;
          case "X":
            return <Tag color="#ed5757">Đã hủy</Tag>;
          case "C":
            return <Tag color="#ff9800">Đang giao hàng</Tag>;
          case "S":
            return <Tag color="#28a745">Đã giao</Tag>;
        }
        return <div> {record}</div>;
      },
    },
    {
      title: "Action",
      render: (record, row) => {
        if (row.Status_code === "C" || row.Status_code === "P") {
          return (
            <div className="d-flex flex-row justify-content-start">
              <UIButton
                color="#28a745"
                size="small"
                ghost
                onClick={() => handleConfirm(row.Id)}
              >
                Xác nhận giao hàng
              </UIButton>
            </div>
          );
        }
        return "";
      },
    },
  ];
  return (
    <React.Fragment>
      <h3 className="page-title">Orders</h3>
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

export default enhancer(ListOrders);
