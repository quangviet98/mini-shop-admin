import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { InputNumber } from "antd";
import { FieldStyle } from "./styles";

const InputNumberCustom = styled(InputNumber)`
  height: 100%;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

class InputNumberField extends PureComponent {
  state = {
    numInput: 0,
  };

  handleFormatter = (value) => {
    if (value.toString().match("[0-9]*")) {
      this.setState({ numInput: value });
      return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return null;
  };

  handleParser = (value) => {
    return value.match("[0-9]*") && value.replace(/\$\s?|(,*)/g, "");
  };
  render() {
    const {
      label,
      name,
      defaultValue,
      disabled,
      help,
      size,
      placeholder,
      onBlur,
      onChange,
      validateStatus,
      inputStyle,
      labelCol,
      wrapperCol,
      readCurrency,
      max,
      mBottom,
      value,
    } = this.props;
    return (
      <FieldStyle
        label={label}
        size={size}
        validateStatus={validateStatus}
        help={help}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        // extra={
        //   readCurrency &&
        //   this.state.numInput > 0 && (
        //     <p style={{ color: Color.gray9 }}>
        //       {readCurrencyString(this.state.numInput)}
        //     </p>
        //   )
        // }
        mBottom={mBottom}
      >
        <InputNumberCustom
          name={name}
          min={0}
          max={max}
          defaultValue={defaultValue}
          value={value}
          formatter={this.handleFormatter}
          parser={this.handleParser}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
          style={inputStyle}
        />
      </FieldStyle>
    );
  }
}

InputNumberField.defaultProps = {
  disabled: false,
  placeholder: "username",
  readCurrency: false,
};

InputNumberField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  inputStyle: PropTypes.object,
  onChange: PropTypes.func,
  readCurrency: PropTypes.bool,
};

export default InputNumberField;
