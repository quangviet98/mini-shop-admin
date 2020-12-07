import React from "react";
import { Button, Icon, Modal, Popconfirm, Select, Tag, Tooltip } from "antd";
import { UITable } from "../../../presentation/ui/tables";
import enhancer from "./withEnhancer";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as PATH from "../../../../configs/routesConfig";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
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
  const {
    reducer,
    handleCancelOrder,
    visible,
    confirmLoading,
    handleChangeDeliver,
    setVisible,
    deliver,
    handleDeliveryOrder,
    setIdOrder,
  } = props;
  const { loading, query, data, total } = reducer;

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "Id",
      render: (record) => {
        return (
          <Link to={PATH.ORDER_DETAIL_PATH.replace(":id", record)}>
            {record}
          </Link>
        );
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
        return <div> {dayjs(record).utc().format("DD/MM/YYYY H:mm:ss ")}</div>;
      },
    },
    {
      title: "Người lập phiếu",
      dataIndex: "HOTEN_ST",
      render: (record) => {
        return <div> {record}</div>;
      },
    },
    {
      title: "Người giao hàng",
      dataIndex: "HOTEN_DL",
      render: (record, row) => {
        if (row.Status_code === "P") {
          return (
            <Tooltip title="Chọn nhân viên giao hàng">
              <Button
                ghost
                onClick={() => {
                  setVisible(true);
                  setIdOrder(row.Id);
                }}
              >
                <Icon type="form" style={{ fontSize: "18px", color: "#08c" }} />
              </Button>
            </Tooltip>
          );
        } else {
          return <div> {record}</div>;
        }
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
                color="#ed5757"
                size="small"
                ghost
                onClick={() => handleCancelOrder(row.Id)}
              >
                Hủy đơn hàng
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
        <Modal
          title="Chọn nhân viên giao hàng"
          visible={visible}
          onOk={() => handleDeliveryOrder()}
          confirmLoading={confirmLoading}
          onCancel={() => setVisible(false)}
          okText="Giao hàng"
          cancelText="Hủy"
        >
          <UISelect
            placeholder="Chọn nhân viên"
            onChange={handleChangeDeliver}
            style={{ width: "100%" }}
          >
            {deliver.map((item) => (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            ))}
          </UISelect>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default enhancer(ListOrders);
