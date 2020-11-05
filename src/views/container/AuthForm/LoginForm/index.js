import React, { PureComponent } from "react";
import { Form, Button } from "antd";
import enhance from "./withForm";
import { InputField } from "../../../presentation/ui/fields";
import Logo from "./../../../../static/images/logo-pink.png";
import styled from "styled-components";

const WrapperForm = styled.div`
  margin: 0px auto;
  width: 100%;
  width: 620px;
  background-color: rgb(255, 255, 255);
  padding: 28px 100px;
  border-radius: 60px 10px 60px 10px;
  box-shadow: rgb(147, 150, 150) 13px 13px 30px -6px;
`;

const UIButton = styled(Button)`
  background: rgb(255, 33, 104);
  background: linear-gradient(
    90deg,
    rgba(255, 33, 104, 1) 0%,
    rgba(238, 174, 217, 1) 100%
  );
  color: white;
  padding: 0px 100px;
  height: 38px;
  font-size: 14px;

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
class LoginForm extends PureComponent {
  render() {
    const {
      handleSubmit,
      values,
      handleChange,
      handleBlur,
      touched,
      errors,
      isValid,
      isSubmitting,
    } = this.props;

    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 login-page ">
        <img
          src={Logo}
          alt="App logo"
          style={{ maxWidth: 100 }}
          className="mb-3"
        />
        <WrapperForm className="d-flex justify-content-center align-items-center flex-column">
          <Form className="col-12" onSubmit={handleSubmit}>
            <InputField
              labelCol={12}
              label="Username"
              validateStatus={touched.usr && errors.usr ? "error" : undefined}
              help={touched.usr && errors.usr ? errors.usr : ""}
              name="usr"
              // autoComplete="username"
              value={values.usr}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Username"
              typeIcon="email"
              size="large"
            />

            <InputField
              validateStatus={touched.pwd && errors.pwd ? "error" : undefined}
              help={touched.pwd && errors.pwd ? errors.pwd : ""}
              labelCol={12}
              label="Password"
              type="password"
              name="pwd"
              // autoComplete="current-password"
              value={values.pwd}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
              typeIcon="pass"
              size="large"
            />

            <div className="d-flex justify-content-center mt-5 mb-3">
              <UIButton
                shape="round"
                htmlType="submit"
                disabled={!isValid}
                loading={isSubmitting}
              >
                LOGIN
              </UIButton>
            </div>
          </Form>
        </WrapperForm>
      </div>
    );
  }
}

export default enhance(LoginForm);
