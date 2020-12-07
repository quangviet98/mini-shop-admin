import React, { PureComponent } from 'react';
import { Icon, Select } from 'antd';
import PropTypes from 'prop-types';
import { SelectStyle } from './styles';

const Option = Select.Option;

export default class SelectField extends PureComponent {
  render() {
    const {
      label,
      help,
      data,
      size,
      onChange,
      className,
      onBlur,
      validateStatus,
      iconEnd,
      iconStyle,
      inputStyle,
      gutterBottom,
      labelCol,
      wrapperCol,
      mode,
      ...rest
    } = this.props;
    
    return (
      <SelectStyle
        label={label}
        size={size}
        className={className}
        hasFeedback
        validateStatus={validateStatus}
        help={help}
        gutterBottom={gutterBottom}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        mode={mode}
      >
        <Select
          style={inputStyle}
          onChange={onChange}
          onBlur={onBlur}
          suffixIcon={iconEnd && <Icon type={iconEnd} style={iconStyle} />}
          mode={mode}
          {...rest}
        >
          {data &&
            data.map(item => (
              <Option value={item.value} key={item.value}>
                {item.label}
              </Option>
            ))}
        </Select>
      </SelectStyle>
    );
  }
}

SelectField.defaultProps = {
  disabled: false,
  placeholder: '',
  defaultValue: '',
  iconStyle: { color: 'rgba(0,0,0,.25)' },
  gutterBottom: true,
  mode: 'default'
};

SelectField.propTypes = {
  label: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  inputStyle: PropTypes.object,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  data: PropTypes.array,
  gutterBottom: PropTypes.bool
};
