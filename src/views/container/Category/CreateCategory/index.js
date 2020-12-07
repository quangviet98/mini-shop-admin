import { Form, Input, Button } from "antd";
import React from "react";
import styled from "styled-components";
import { InputField } from "../../../presentation/ui/fields";
import enhancer from "./withEnhancer";
const { TextArea } = Input;

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

function CreateCategory(props) {
  const {
    handleSubmit,
    isSubmitting,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    isEdit,
  } = props;

  return (
    <React.Fragment>
      <h3 className="page-title">
        {!isEdit ? "Create Category" : "Update Category"}
      </h3>

      <div className="card p-5">
        <Form onSubmit={handleSubmit}>
          <InputField
            label="Tên danh mục"
            name="Name"
            value={values.Name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tên danh mục"
            validateStatus={touched.Name && errors.Name ? "error" : undefined}
            help={touched.Name && errors.Name ? errors.Name : undefined}
          />

          <Form.Item
            label="Mô tả"
            validateStatus={
              touched.Description && errors.Description ? "error" : undefined
            }
            help={
              touched.Description && errors.Description
                ? errors.Description
                : undefined
            }
          >
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
            {!isEdit ? "Thêm danh mục" : "Cập nhật danh mục"}
          </UIButton>
        </Form>
      </div>
    </React.Fragment>
  );
}

export default enhancer(CreateCategory);
