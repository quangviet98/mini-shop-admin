import * as yup from "yup";

/** Regex Validation **/
const isPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}/i;
const isPassword = /^(?!.* )/i;

/**  * Message Error **/
const nameRequired = "Vui lòng nhập Họ tên";

const phoneInvalid = "Phone number invalid";
const genderRequired = "Vui lòng chọn giới tính";
const dateRequired = "Vui lòng chọn ngày sinh";
const emailInvalid = "Email không hợp lệ";
const emailRequired = "Email không được trống";
const passwordRequired = "Vui lòng nhập mật khẩu";
const passwordMatch = "Mật khẩu phải khớp với nhau";
const passwordLimit = "Mật khẩu từ 6 ký tự trở lên";
const passwordValid = "Mật khẩu phải có các ký tự chữ và số";

const lastNameRequired = "Last name is required";
const firstNameRequired = "First name is required";
const fieldIsRequired = "Vui lòng điền thông tin";
const imageRequired = "Vui lòng  chọn hình ảnh";
/**
/* Validation */

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

export const firstNameValidate = yup
  .string()
  .trim()
  .required(firstNameRequired);
export const lastNameValidate = yup.string().trim().required(lastNameRequired);
export const requiredValidField = yup
  .string()
  .required(fieldIsRequired)
  .nullable();
export const arrayValidate = yup.array().required(fieldIsRequired);
export const imageValidate = yup.string().required(imageRequired);
export const numberValidate = yup.number().required(fieldIsRequired);
