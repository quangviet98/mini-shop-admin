export const parseCurrency = (str, sign = "$", fractionDigits = 2) => {
  if (str === "FreeShipping") return str;
  if (str !== null && str !== "undefined") {
    let tmp = parseFloat(str);
    return `${sign}${(tmp || 0).toLocaleString(undefined, {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    })}`;
  } else {
    return "";
  }
};

export default parseCurrency;

const parseCurrency2 = (str, sign = "") => {
  if (str === "FreeShipping") return str;
  if (str !== null && str !== "undefined") {
    let tmp = parseFloat(str);
    return `${sign}${(tmp || 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  } else {
    return "";
  }
};
export { parseCurrency2 };
