import { Card, Table, Tag } from "antd";
import React from "react";
import enhancer from "./withEnhancer";
import { Steps } from "antd";
import styled from "styled-components";
import { IMAGES_URL } from "../../../../configs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
const { Step } = Steps;

const StepsUI = styled(Steps)`
  .ant-steps-item-content {
    min-height: 99px !important;
  }
`;

function OrderDetail(props) {
  const {
    reducer: { data },
    currentStep,
  } = props;
  // const { items, order } = data;

  console.log("propsssss", data);

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "ImageUrl",
      render: (record) => {
        return (
          <img style={{ maxWidth: "40px" }} src={`${IMAGES_URL}${record}`} />
        );
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
      title: "Số lượng",
      dataIndex: "Quantity",
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
  ];

  const renderStt = () => {
    switch (data && data.order && data.order.Status_code) {
      case "P":
        return <Tag color="#108ee9">Đang chờ</Tag>;
      case "X":
        return <Tag color="#ed5757">Đã hủy</Tag>;
      case "C":
        return <Tag color="#ff9800">Đang giao hàng</Tag>;
      case "S":
        return <Tag color="#28a745">Đã giao</Tag>;
    }
  };
  return (
    <React.Fragment>
      <div className="d-flex flex-row justify-content-md-between">
        <h3 className="page-title">ORDER DETAIL</h3>
      </div>
      <div className="card">
        <div className="text-right mb-2">
          Trạng thái đơn hàng: {renderStt()}
        </div>
        <div className="row">
          <div className="col-7">
            <Card
              size="small"
              title={"Thông tin người đặt hàng"}
              style={{ width: "100%" }}
            >
              <p className="d-flex justify-content-between mb-2">
                <span>Tên khách hàng</span>
                <span>{data && data.order && data.order.HOTEN}</span>
              </p>
              <p className="d-flex justify-content-between mb-2">
                <span>Số điện thoại</span>
                <span>{data && data.order && data.order.SDT_DL}</span>
              </p>

              <p className="d-flex justify-content-between mb-2">
                <span>Địa chỉ</span>
                <span>{data && data.order && data.order.Address}</span>
              </p>
            </Card>
            <Card
              size="small"
              title={"Thông tin đơn hàng"}
              style={{ width: "100%" }}
              className="mt-4"
            >
              <p className="d-flex justify-content-between mb-2">
                <span>Người lập phiếu</span>
                <span>{data && data.order && data.order.HOTEN_ST}</span>
              </p>
              <p className="d-flex justify-content-between mb-2">
                <span>Nhân viên giao hàng</span>
                <span>{data && data.order && data.order.HOTEN_DL}</span>
              </p>
              <p className="d-flex justify-content-between mb-2">
                <span>Ngày đặt</span>
                <span>
                  {data &&
                    data.order &&
                    dayjs(data.order.CreateTime)
                      .utc()
                      .format("DD/MM/YYYY H:mm:ss")}
                </span>
              </p>
              <p className="d-flex justify-content-between mb-2">
                <span>Note</span>
                <span>{data && data.order && data.order.Notes}</span>
              </p>
            </Card>
          </div>
          <div className="col-1"></div>
          <div className="col-4 pt-5">
            <StepsUI direction="vertical" size="small" current={currentStep}>
              <Step title="Đang chờ" description="Đơn hàng đang chờ xử lý." />
              <Step
                title="Đang giao hàng"
                description="Đang trên đường giao hàng cho khách."
              />
              <Step
                title="Đã giao"
                description="Đơn hàng đã giao đến tay khách."
              />
            </StepsUI>
          </div>
        </div>

        <Card
          size="small"
          title={"Thông tin sản phẩm đã đặt"}
          style={{ width: "100%" }}
          className="mt-4"
        >
          <Table
            columns={columns}
            dataSource={(data && data.items) || []}
            bordered
            footer={() => (
              <h6 className="text-right ">Tổng tiền: {data && data.total}</h6>
            )}
            pagination={false}
            rowKey="Id"
          />
        </Card>
      </div>
    </React.Fragment>
  );
}

export default enhancer(OrderDetail);
