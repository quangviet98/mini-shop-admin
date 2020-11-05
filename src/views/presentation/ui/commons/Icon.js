import React from "react";
import styled from "styled-components";
import { ReactComponent as User } from "../../../../static/icons/user.svg";
import { ReactComponent as Phone } from "../../../../static/icons/phone.svg";
import { ReactComponent as Email } from "../../../../static/icons/email.svg";
import { ReactComponent as Pass } from "../../../../static/icons/pass.svg";
import { ReactComponent as Calendar } from "../../../../static/icons/calendar.svg";

import { ReactComponent as Cancel } from "../../../../static/icons/cancel.svg";
import { ReactComponent as Delivered } from "../../../../static/icons/delivered.svg";
import { ReactComponent as Fulfill } from "../../../../static/icons/fulfill.svg";
import { ReactComponent as Unfulfill } from "../../../../static/icons/unfulfill.svg";
import { ReactComponent as Paid } from "../../../../static/icons/paid.svg";
import { ReactComponent as Unpaid } from "../../../../static/icons/unpaid.svg";
import { ReactComponent as Refund } from "../../../../static/icons/refund.svg";
import { ReactComponent as Returned } from "../../../../static/icons/returned.svg";

import { ReactComponent as DeleteWhite } from "../../../../static/icons/delete_white.svg";
import { ReactComponent as DocumentWhite } from "../../../../static/icons/document_white.svg";
import { ReactComponent as DollarWhite } from "../../../../static/icons/dollar_white.svg";
import { ReactComponent as ProcessingOrders } from "../../../../static/icons/processing_orders.svg";
import { ReactComponent as CreditCard } from "../../../../static/icons/credit_card.svg";

export const renderIcon = (type) => {
  switch (type) {
    case "user":
      return <User />;
    case "phone":
      return <Phone />;
    case "email":
      return <Email />;
    case "pass":
      return <Pass />;
    case "calendar":
      return <Calendar />;
    case "cancel":
      return <Cancel />;
    case "delivered":
      return <Delivered />;
    case "fulfill":
      return <Fulfill />;
    case "paid":
      return <Paid />;
    case "refund":
      return <Refund />;
    case "unfulfill":
      return <Unfulfill />;
    case "unpaid":
      return <Unpaid />;
    case "returned":
      return <Returned />;
    case "deleteWhite":
      return <DeleteWhite />;
    case "documentWhite":
      return <DocumentWhite />;
    case "dollarWhite":
      return <DollarWhite />;
    case "processingOrders":
      return <ProcessingOrders />;
    case "creditCard":
      return <CreditCard />;
    default:
      return null;
  }
};

const IconStyle = styled.i`
  svg {
    width: 1em;
    height: 1em;
  }
`;

const UIIcon = ({ typeIcon, size, ...rest }) => {
  return (
    <IconStyle
      className="anticon"
      style={{ fontSize: size ? size + "px" : "14px" }}
      {...rest}
    >
      {renderIcon(typeIcon)}
    </IconStyle>
  );
};

export const MDIcon = ({ name, size, ...rest }) => {
  return (
    <i
      className={`mdi ${name}`}
      style={{ fontSize: size ? size + "px" : "14px" }}
      {...rest}
    />
  );
};

export default UIIcon;
