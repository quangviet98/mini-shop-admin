import { message } from "antd";
import * as _ from "lodash";

import { errormessage } from "~/configs/intlMessage";

export function displayerror(error, formatMessage) {
    let msgObject =
        typeof errormessage[error.message] !== "undefined"
            ? errormessage[error.message]
            : { id: "Server Error", defaultMessage: "Lỗi hệ thống" };
    message.info(formatMessage(msgObject));
}

export const converErrorToIntl = (error, ErrorList) => {
    if (
        typeof error.path !== "undefined" &&
        typeof error.detail !== "undefined" &&
        typeof ErrorList[error.path][error.detail] === "undefined"
    ) {
        if (typeof error.detail !== "undefined" && typeof error.detail === "string") return { message: error.detail };

        return { message: "Function Error" };
    } else if (typeof error.path !== "undefined" && typeof error.detail !== "undefined") {
        return ErrorList[error.path][error.detail];
    } else if (typeof error.message !== "undefined") {
        return { message: error.message };
    } else {
        return { message: "Function Error" };
    }
};

export function showerrmessage(err) {
    console.log("Log error message", typeof err, err);
    if (Object.getOwnPropertyNames(err).message !== "") {
        switch (err.message) {
            case "price This Field require a number":
                err.message = "Your Price field requires a number";
        }
        message.info(err.message);
        return;
    }
    let tmperr = {};
    try {
        tmperr = JSON.parse(err);
    } catch (error) {
        message.info(error);
    }

    if (tmperr.data === null) {
        message.error(tmperr.message);
    } else if (tmperr.data.length) {
        _.each(tmperr.data, function (item) {
            message.error(item);
        });
    } else {
        message.error(tmperr.message);
    }
}

export default showerrmessage;
