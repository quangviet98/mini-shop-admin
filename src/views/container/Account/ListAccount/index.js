import { Button, Icon, Modal, Popconfirm, Select } from "antd";
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
const UISelect = styled(Select)`
  .ant-select-selection--multiple .ant-select-selection__choice {
    background-color: #9ce1f9;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;
const ListAccount = (props) => {
  const {
    reducer,
    history,
    visible,
    confirmLoading,
    setVisible,
    selectedItems,
    handleSelectRole,
    handleDeselectRole,
    handleChangeRole,
    roles,
    handleOpenModal,
  } = props;
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
      dataIndex: "Ten",
      render: (record) => {
        return <div> {record}</div>;
      },
    },
    {
      title: "Email",
      dataIndex: "Email",
      render: (record) => {
        return <div> {record}</div>;
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "SDT",
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
              onClick={() => handleOpenModal(row.Id)}
            >
              Roles
            </UIButton>
          </div>
        );
      },
    },
  ];

  return (
    <React.Fragment>
      <div className="d-flex flex-row justify-content-md-between">
        <h3 className="page-title">Account</h3>
        <Button
          type="primary"
          onClick={() => history.push(PATH.CREATE_ACCOUNT_PATH)}
        >
          <span className="d-flex flex-row justify-content-md-between align-items-center">
            <Icon type="plus" className="mr-1" />
            <span>Thêm tài khoản</span>
          </span>
        </Button>
      </div>

      <Modal
        title="ROLES"
        visible={visible}
        onOk={() => setVisible(false)}
        confirmLoading={confirmLoading}
        onCancel={() => setVisible(false)}
      >
        <UISelect
          mode="multiple"
          placeholder="Chọn quyền"
          value={selectedItems}
          onChange={handleChangeRole}
          onDeselect={handleDeselectRole}
          onSelect={handleSelectRole}
          style={{ width: "100%" }}
        >
          {roles.map((item) => (
            <Select.Option key={item.Id} value={item.Id}>
              {item.Name}
            </Select.Option>
          ))}
        </UISelect>
      </Modal>

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

export default enhancer(ListAccount);
