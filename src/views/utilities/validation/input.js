/*eslint-disable */
import React from "react";
import * as yup from "yup";
import { FormattedMessage } from "react-intl";

/** Regex Validation **/
const isPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}/i;
const isPassword = /^(?!.* )/i;
const isZipCode = /^\d{5}(?:[-\s]\d{4})?$/;
const isStateCode = /[a-zA-Z]{2}$/;

/**  * Message Error **/
const nameRequired = (
  <FormattedMessage id="NAME_REQUIRED" defaultMessage="Vui lòng nhập Họ tên" />
);
const phoneInvalid = (
  <FormattedMessage id="PHONE_INVALID" defaultMessage="Phone number invalid" />
);
const genderRequired = (
  <FormattedMessage
    id="GENDER_REQUIRED"
    defaultMessage="Vui lòng chọn giới tính"
  />
);
const dateRequired = (
  <FormattedMessage
    id="BIRTHDAY_REQUIRED"
    defaultMessage="Vui lòng chọn ngày sinh"
  />
);
const emailInvalid = (
  <FormattedMessage id="EMAIL_INVALID" defaultMessage="Email invalid" />
);
const emailRequired = (
  <FormattedMessage id="EMAIL_REQUIRED" defaultMessage="Email is required" />
);
const passwordRequired = (
  <FormattedMessage
    id="PASSWORD_REQUIRED"
    defaultMessage="Password is required"
  />
);
const passwordMatch = (
  <FormattedMessage
    id="PASSWORD_MATCH"
    defaultMessage="Mật khẩu phải khớp với nhau"
  />
);
const passwordLimit = (
  <FormattedMessage
    id="PASSWORD_LIMIT"
    defaultMessage="Mật khẩu từ 6 ký tự trở lên"
  />
);
const passwordValid = (
  <FormattedMessage
    id="PASSWORD_VALID"
    defaultMessage="Mật khẩu phải có các ký tự chữ và số"
  />
);
const codeInvalid = (
  <FormattedMessage
    id="CODE_INVALID"
    defaultMessage="Mã xác nhận không hợp lệ"
  />
);
const lastNameRequired = (
  <FormattedMessage
    id="LAST_NAME_REQUIRED"
    defaultMessage="Last name is required"
  />
);
const firstNameRequired = (
  <FormattedMessage
    id="FIRST_NAME_REQUIRED"
    defaultMessage="First name is required"
  />
);
const fieldIsRequired = (
  <FormattedMessage
    id="REQUIRED_FIELD"
    defaultMessage="This field is required"
  />
);
const addressRequired = (
  <FormattedMessage
    id="ADDRESS_REQUIRED"
    defaultMessage="Address is required"
  />
);
const stateCodeRequired = (
  <FormattedMessage
    id="STATE_REQUIRED"
    defaultMessage="State code is required"
  />
);
const cityRequired = (
  <FormattedMessage id="CITY_REQUIRED" defaultMessage="City is required" />
);
const zipRequired = (
  <FormattedMessage id="ZIP_REQUIRED" defaultMessage="Zip is required" />
);
const zipCodeInvalid = (
  <FormattedMessage
    id="ZIP_CODE_INVALID"
    defaultMessage="Mã Zip code không hợp lệ"
  />
);
const stateCodeInvalid = (
  <FormattedMessage
    id="STATE_CODE_INVALID"
    defaultMessage="Mã tiểu bang - 2 ký tự"
  />
);

/**
 * Message Error for Contract
 */

/**
/* Validation */

// const passwordSchema = yup.string().min(6, passwordLimit).matches(isPassword, passwordValid);
const passwordSchema = yup.string().min(6, passwordLimit);

export const stringRequired = yup.string().required("This field required!");
export const nameValidate = yup.string().trim().required(nameRequired);
export const phoneValidate = yup
  .string()
  .trim()
  .matches(isPhone, phoneInvalid)
  .required(phoneInvalid);
export const genderValidate = yup.string().required(genderRequired);
export const dateValidate = yup.string().required(dateRequired);
export const emailValidate = yup
  .string()
  .trim()
  .matches(isEmail, emailInvalid)
  .required(emailRequired);
export const passwordValidate = passwordSchema.required(passwordRequired);
export const passwordConfirmationValidate = passwordValidate.oneOf(
  [yup.ref("password"), null],
  passwordMatch
);
export const codeValidate = yup
  .string()
  .min(6, codeInvalid)
  .required(codeInvalid);
export const firstNameValidate = yup
  .string()
  .trim()
  .required(firstNameRequired);
export const lastNameValidate = yup.string().trim().required(lastNameRequired);
export const requiredValidField = yup.string().required(fieldIsRequired);
export const arrayValidate = yup.array().required(fieldIsRequired);
export const zipCodeValidate = yup
  .string()
  .trim()
  .matches(isZipCode, zipCodeInvalid)
  .required(zipCodeInvalid);
export const stateCodeValidate = yup
  .string()
  .trim()
  .matches(isStateCode, stateCodeInvalid)
  .required(stateCodeInvalid);
export const zipCodeValidateNotRequired = yup
  .string()
  .trim()
  .matches(isZipCode, zipCodeInvalid);
export const stateCodeValidateNotRequired = yup
  .string()
  .trim()
  .matches(isStateCode, stateCodeInvalid);
