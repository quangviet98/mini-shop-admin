import _ from "lodash";

export function getString(obj, propertyPath = undefined) {
    try {
        // propertyPath phải là string hoặc undefined
        if (!_.isUndefined(propertyPath) && !_.isString(propertyPath)) {
            return undefined;
        }
        if (!_.isNil(propertyPath)) {
            if (_.isNil(obj)) {
                return undefined;
            }
            if (_.isObject(obj)) {
                var properties = propertyPath.split(".");
                // tìm property value từ property path
                let result = properties.reduce((prev, curr) => prev && prev[curr], obj);
                return _.isString(result) ? result : undefined;
            }
        } else if (_.isString(obj)) {
            return obj;
        }
    } catch (err) {
        console.log(err);
    }
    return undefined;
}

export function getNumber(obj, propertyPath = undefined) {
    try {
        // propertyPath phải là string hoặc undefined

        const fixedFloatNumber = (value) => {
            return parseFloat(Number(value).toFixed(4));
        };
        if (!_.isUndefined(propertyPath) && !_.isString(propertyPath)) {
            return undefined;
        }
        if (!_.isNil(propertyPath)) {
            if (_.isNil(obj)) {
                return undefined;
            }
            if (_.isObject(obj)) {
                var properties = propertyPath.split(".");
                // tìm property value từ property path
                let result = properties.reduce((prev, curr) => prev && prev[curr], obj);
                return _.isNumber(result) ? fixedFloatNumber(result) : undefined;
            }
        } else if (_.isNumber(obj)) {
            return fixedFloatNumber(obj);
        }
    } catch (err) {
        console.log(err);
    }
    return undefined;
}

export function getMessageValue(obj, mesval) {
    let res = `${mesval}`;
    for (const key in obj) {
        if (obj[key].value === mesval) {
            res = obj[key].defaultMessage;
        }
    }
    return res;
}

export function getBool(obj, propertyPath = undefined) {
    try {
        // propertyPath phải là string hoặc undefined
        if (!_.isUndefined(propertyPath) && !_.isString(propertyPath)) {
            return undefined;
        }
        if (!_.isNil(propertyPath)) {
            if (_.isNil(obj)) {
                return undefined;
            }
            if (_.isObject(obj)) {
                var properties = propertyPath.split(".");
                // tìm property value từ property path
                let result = properties.reduce((prev, curr) => prev && prev[curr], obj);
                return _.isBoolean(result) ? result : undefined;
            }
        } else if (_.isBoolean(obj)) {
            return obj;
        }
    } catch (err) {
        console.log(err);
    }
    return undefined;
}

export function getArray(obj, propertyPath = undefined) {
    try {
        // propertyPath phải là string hoặc undefined
        if (!_.isUndefined(propertyPath) && !_.isString(propertyPath)) {
            return undefined;
        }
        if (!_.isNil(propertyPath)) {
            if (_.isNil(obj)) {
                return undefined;
            }
            if (_.isObject(obj)) {
                var properties = propertyPath.split(".");
                // tìm property value từ property path
                let result = properties.reduce((prev, curr) => prev && prev[curr], obj);
                return _.isArray(result) ? result : undefined;
            }
        } else if (_.isArray(obj)) {
            return obj;
        }
    } catch (err) {
        console.log(err);
    }
    return undefined;
}

export function getObject(obj, propertyPath = undefined) {
    try {
        // propertyPath phải là string hoặc undefined
        if (!_.isUndefined(propertyPath) && !_.isString(propertyPath)) {
            return undefined;
        }
        if (!_.isNil(propertyPath)) {
            if (_.isNil(obj)) {
                return undefined;
            }
            if (_.isObject(obj)) {
                var properties = propertyPath.split(".");
                // tìm property value từ property path
                let result = properties.reduce((prev, curr) => prev && prev[curr], obj);
                return _.isObject(result) ? result : undefined;
            }
        } else if (_.isObject(obj)) {
            return obj;
        }
    } catch (err) {
        console.log(err);
    }
    return undefined;
}

export function getMatchedValueWithRegex(val, reg) {
    let results = (val || "").match(reg) || [];
    return results.find(_, (idx) => idx === 0) || "";
}
