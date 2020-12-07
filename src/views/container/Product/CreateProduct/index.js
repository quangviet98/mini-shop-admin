import { Form, InputNumber, Input, Icon, Upload, message, Button } from "antd";
import React from "react";
import styled from "styled-components";
import { IMAGES_URL } from "../../../../configs";
import {
  InputField,
  InputNumberField,
  SelectField,
} from "../../../presentation/ui/fields";
import enhancer from "./withEnhancer";
const { TextArea } = Input;

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("Chỉ được upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Hình phải nhỏ hơn 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const UIButton = styled(Button)`
  background: rgb(44, 215, 156);
  background: linear-gradient(
    90deg,
    rgba(44, 215, 156, 1) 0%,
    rgba(0, 255, 248, 1) 100%
  );
  color: white;
  padding: 0px 100px;
  height: 38px;
  font-size: 15px;

  &:hover,
  &:focus {
    border: none;
    color: white;
    background: rgb(180, 58, 58);
    background: linear-gradient(
      90deg,
      rgba(180, 58, 58, 1) 0%,
      rgba(235, 76, 149, 1) 56%,
      rgba(252, 69, 229, 1) 100%
    );
  }
`;

function CreateProduct(props) {
  const {
    upLoading,
    imageUrl,
    handleUploadImage,
    handleSubmit,
    isSubmitting,
    categories,
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    isEdit,
    touched,
    errors,
  } = props;
  const uploadButton = (
    <div>
      <Icon type={upLoading ? "loading" : "plus"} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <React.Fragment>
      <h3 className="page-title">
        {!isEdit ? "Create product" : "Update product"}
      </h3>

      <div className="card p-5">
        <Form onSubmit={handleSubmit}>
          <SelectField
            name="CategoryId"
            label="Danh mục"
            value={values.CategoryId}
            placeholder="Chọn danh mục"
            onChange={(val) => setFieldValue("CategoryId", val)}
            onBlur={() => setFieldTouched("CategoryId", true)}
            data={categories}
            validateStatus={
              touched.CategoryId && errors.CategoryId ? "error" : undefined
            }
            help={
              touched.CategoryId && errors.CategoryId
                ? errors.CategoryId
                : undefined
            }
          />
          <InputField
            label="Tên sản phẩm"
            name="Name"
            value={values.Name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tên sản phẩm"
            validateStatus={touched.Name && errors.Name ? "error" : undefined}
            help={touched.Name && errors.Name ? errors.Name : undefined}
          />
          <Form.Item
            label="Giá sản phẩm"
            validateStatus={touched.Price && errors.Price ? "error" : undefined}
            help={touched.Price && errors.Price ? errors.Price : undefined}
          >
            <InputNumber
              size="default"
              name="Price"
              value={values.Price}
              onChange={(val) => setFieldValue("Price", val)}
              onBlur={handleBlur}
              placeholder="Giá sản phẩm"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <div className="row">
            <div className="col-6">
              <Form.Item
                label="Số lượng"
                validateStatus={
                  touched.Quantity && errors.Quantity ? "error" : undefined
                }
                help={
                  touched.Quantity && errors.Quantity
                    ? errors.Quantity
                    : undefined
                }
              >
                <InputNumber
                  size="default"
                  name="Quantity"
                  value={values.Quantity}
                  onChange={(val) => setFieldValue("Quantity", val)}
                  onBlur={handleBlur}
                  placeholder="Số lượng"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item label="Giảm giá">
                <InputNumber
                  size="default"
                  name="Discount"
                  value={values.Discount}
                  onChange={(val) => setFieldValue("Discount", val)}
                  onBlur={handleBlur}
                  placeholder="Giảm giá"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <div className="col-1 "></div>
            <div className="col-5 ">
              <Form.Item
                label="Hình sản phẩm"
                validateStatus={
                  touched.ImageUrl && errors.ImageUrl ? "error" : undefined
                }
                help={
                  touched.ImageUrl && errors.ImageUrl
                    ? errors.ImageUrl
                    : undefined
                }
              >
                <Upload
                  name="file"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="http://103.205.96.158:5001/api/v1/upload"
                  beforeUpload={beforeUpload}
                  onChange={handleUploadImage}
                >
                  {values.ImageUrl ? (
                    <img
                      src={`${IMAGES_URL}${values.ImageUrl}`}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
            </div>
          </div>

          <Form.Item label="Mô tả">
            <TextArea
              placeholder="Mô tả"
              name="Description"
              value={values.Description}
              onChange={handleChange}
              onBlur={handleBlur}
              autosize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>
          <UIButton htmlType="submit" loading={isSubmitting}>
            {!isEdit ? "Thêm sản phẩm" : "Cập nhật sản phẩm"}
          </UIButton>
        </Form>
      </div>
    </React.Fragment>
  );
}

export default enhancer(CreateProduct);
