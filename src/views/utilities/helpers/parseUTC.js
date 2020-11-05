import moment from "moment";
import { utcTimeString } from "~/configs";

const parseUTC = (date, format = null) =>
  moment(date)
    .format(format ? format : utcTimeString);

export default parseUTC;
