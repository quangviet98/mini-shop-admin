import { message } from "antd";

export const showErrorMessage = (error) => {
  switch (error.status) {
    case 204:
      return message.error("Sai thông tin đăng nhập!");
  }
};
