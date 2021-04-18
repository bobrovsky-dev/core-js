export function initType (B)
{
    B.extend({
        type: Type
    })
}

export default class Type
{
    static isEmpty(value)
    {
        if (Type.isArray(value) || Type.isString(value))
        {
            return value.length === 0
        }

        if (Type.isNumber(value))
        {
            return value === 0
        }

        if (Type.isBoolean(value))
        {
            return value === false
        }

        if (Type.isObject(value))
        {
            return Type.isEmpty(Object.getOwnPropertyNames(value))
        }

        return Type.isNil(value)
    }

    static isString(value)
    {
        return typeof value === 'string'
    }

    static isNotEmptyString(value)
    {
        return Type.isString(value) && value !== ''
    }

    static isSymbol(value)
    {
        const type = typeof value
        return type == 'symbol' || (type === 'object' && value != null && Object.prototype.toString.call(value) == '[object Symbol]')
    }

    static isArray(value)
    {
        return !Type.isNil(value) && Array.isArray(value)
    }

    static isArrayLike(value)
    {
        return (
            !Type.isNil(value)
            && !Type.isFunction(value)
            && value.length > -1
            && value.length <= Number.MAX_SAFE_INTEGER
        )
    }

    static isObject(value)
    {
        return !!value && typeof value === 'object'
    }

    static isPlainObject(value)
    {
        if (!Type.isObject(value) || Object.prototype.toString.call(value) !== '[object Object]')
        {
            return false
        }

        const proto = Object.getPrototypeOf(value)
        if (proto === null)
        {
            return true
        }

        const ctor = proto.hasOwnProperty('constructor') && proto.constructor

        return (
            typeof ctor === 'function' &&
            Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object)
        )
    }

    static isFunction(value)
    {
        return typeof value === 'function'
    }

    static isNumber(value)
    {
        return typeof value === 'number' && !isNaN(value)
    }

    static isInteger(value)
    {
        return Type.isNumber(value) && (value % 1) === 0
    }

    static isFloat(value)
    {
        return Type.isNumber(value) && !Type.isInteger(value)
    }

    static isBoolean(value)
    {
        return value === true || value === false
    }

    static isTrue(value)
    {
        return value === true
    }

    static isFalse(value)
    {
        return value === false
    }

    static isUndefined(value)
    {
        return typeof value === 'undefined'
    }

    static isNull(value)
    {
        return value === null
    }

    static isNil(value)
    {
        return value === null || value === undefined
    }

    static isDate(value)
    {
        return Type.isObject(value) && Object.prototype.toString.call(value) === '[object Date]'
    }

    static isDomNode(value)
    {
        return Type.isObject(value) && !Type.isPlainObject(value) && 'nodeType' in value
    }

    static isElementNode(value)
    {
        return Type.isDomNode(value) && value.nodeType === Node.ELEMENT_NODE
    }

    static isTextNode(value)
    {
        return Type.isDomNode(value) && value.nodeType === Node.TEXT_NODE
    }

    static isPrototype(value)
    {
        return (
            (((typeof (value && value.constructor) === 'function') && value.constructor.prototype) || Object.prototype) === value
        )
    }

    static isMap(value)
    {
        return Type.isObject(value) && getTag(value) === '[object Map]'
    }

    static isSet(value)
    {
        return Type.isObject(value) && getTag(value) === '[object Set]'
    }

    static isWeakMap(value)
    {
        return Type.isObject(value) && getTag(value) === '[object WeakMap]'
    }

    static isWeakSet(value)
    {
        return Type.isObject(value) && getTag(value) === '[object WeakSet]'
    }

    static isBlob(value)
    {
        return (
            Type.isObject(value)
            && Type.isNumber(value.size)
            && Type.isString(value.type)
            && Type.isFunction(value.slice)
        )
    }

    static isFormData(value)
    {
        return value instanceof FormData
    }

    static isPromise(value)
    {
        return (
            !Type.isNil(value) &&
            Type.isFunction(value.then) &&
            Type.isFunction(value.catch)
        )
    }

    static toNumber(value)
    {
        let parsedValue = parseFloat(value)
        return Type.isNumber(parsedValue) ? parsedValue : 0
    }

    static toInteger(value)
    {
        return Type.toNumber(parseInt(value, 10))
    }

    static toFloat(value)
    {
        return parseFloat(value)
    }

    static toBoolean(value, trueValues = [])
    {
        const transformedValue = Type.isString(value) ? value.toLowerCase() : value
        return ['true', '1', 1, true, ...trueValues].includes(transformedValue)
    }

    static toString(value)
    {
        return value == null
            ? ''
            : Array.isArray(value) || (Type.isPlainObject(value) && value.toString === Object.prototype.toString)
                ? JSON.stringify(value, null, 2)
                : String(value)
    }

    static toObject(arr)
    {
        const res = {}
        for (let i = 0; i < arr.length; i++)
        {
            if (arr[i])
            {
                extend(res, arr[i])
            }
        }
        return res
    }

    static toArray (list, start)
    {
        start = start || 0
        let i = list.length - start
        const ret = new Array(i)
        while (i--)
        {
            ret[i] = list[i + start]
        }
        return ret
    }
}

function getTag (value)
{
    return Object.prototype.toString.call(value)
}

function extend (to, from)
{
    for (const key in from)
    {
        to[key] = from[key]
    }
    return to
}