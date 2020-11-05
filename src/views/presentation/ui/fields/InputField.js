import React, { PureComponent } from "react";
import { Input } from "antd";
import PropTypes from "prop-types";
import { FieldStyle } from "./styles";
import { UIIcon } from "../commons";

export default class InputField extends PureComponent {
  render() {
    const {
      iconStart,
      iconEnd,
      label,
      name,
      type,
      disabled,
      value,
      help,
      size,
      typeIcon,
      hasCustom,
      hasIconLeft,
      hasIconRight,
      placeholder,
      onBlur,
      onChange,
      validateStatus,
      iconStyle,
      inputStyle,
      labelCol,
      wrapperCol,
      addonAfter,
      mBottom,
      ...rest
    } = this.props;
    return (
      <FieldStyle
        label={label}
        size={size}
        validateStatus={validateStatus}
        help={help}
        // labelCol={labelCol}
        wrapperCol={wrapperCol}
        mBottom={mBottom}
      >
        <Input
          name={name}
          value={value}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          // prefix={hasIconLeft && <Icon type={iconStart} style={iconStyle} />}
          suffix={typeIcon && <UIIcon typeIcon={typeIcon} />}
          placeholder={placeholder}
          style={inputStyle}
          addonAfter={addonAfter}
          {...rest}
        />
      </FieldStyle>
    );
  }
}

InputField.defaultProps = {
  hasIconLeft: false,
  hasIconRight: true,
  hasCustom: true,
  disabled: false,
  iconStyle: { color: "rgba(0,0,0,.25)" },
  iconEnd: "user",
  iconStart: "user",
  type: "text",
  placeholder: "",
};

InputField.propTypes = {
  iconStart: PropTypes.string,
  iconEnd: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  validate: PropTypes.array,
  hasIconLeft: PropTypes.bool,
  hasIconRight: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  inputStyle: PropTypes.object,
  onChange: PropTypes.func,
};
