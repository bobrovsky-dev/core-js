export default class Type
{
    static isEmpty(value: any): boolean
    {
        if (this.isArray(value) || this.isString(value))
            return value.length === 0

        if (this.isNumber(value))
            return value === 0

        if (this.isBoolean(value))
            return value === false

        if (this.isObject(value))
            return this.isEmpty(Object.getOwnPropertyNames(value))

        if (this.isNil(value))
            return true

        return false
    }

    static isString(value: any): boolean
    {
        return typeof value === 'string'
    }

    static isSymbol(value: any): boolean
    {
        const type = typeof value
        return type == 'symbol' || (type === 'object' && value != null && Object.prototype.toString.call(value) == '[object Symbol]')
    }

    static toString(value: any): string
    {
        if (this.isString(value))
            return value

        if (this.isNil(value) || this.isObject(value))
            return ''

        if (this.isBoolean(value))
            return !!value ? '1' : ''

        if (this.isArray(value)) {
            return `${value.map((other) => other == null ? other : this.toString(other))}`
        }

        if (this.isSymbol(value))
            return value.toString()

        const result = `${value}`

        return (result == '0' && (1 / value) == -(1 / 0)) ? '-0' : result
    }

    static isFunction(value: any): boolean
    {
        return typeof value === 'function'
    }

    static isObject(value: any): boolean
    {
        return !!value && (typeof value === 'object' || typeof value === 'function')
    }

    static isObjectLike(value: any): boolean
    {
        return !!value && typeof value === 'object'
    }

    static isPlainObject(value: any): boolean
    {
        if (!this.isObjectLike(value) || Object.prototype.toString.call(value) !== '[object Object]')
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

    static isBoolean(value: any): boolean
    {
        return value === true || value === false
    }

    static toBoolean(value: any, trueValues = []): boolean
    {
        const transformedValue = this.isString(value) ? value.toLowerCase() : value
        return ['true', 'y', '1', 1, true, ...trueValues].includes(transformedValue)
    }

    static isNumber(value: any): boolean
    {
        return typeof value === 'number' && !isNaN(value)
    }

    static toNumber(value: any): number
    {
        let parsedValue = parseFloat(value)
        return this.isNumber(parsedValue) ? parsedValue : 0
    }

    static isInteger(value: any): boolean
    {
        return this.isNumber(value) && (value % 1) === 0
    }

    static toInteger(value: any)
    {
        return this.toNumber(parseInt(value, 10))
    }

    static isFloat(value: any): boolean
    {
        return this.isNumber(value) && !this.isInteger(value)
    }

    static toFloat(value: any)
    {
        return parseFloat(value)
    }

    static isNil(value: any): boolean
    {
        return value === null || value === undefined
    }

    static isArray(value: any): boolean
    {
        return !this.isNil(value) && Array.isArray(value)
    }

    static isDate(value: any): boolean
    {
        return this.isObjectLike(value) && Object.prototype.toString.call(value) === '[object Date]'
    }

    static isDomNode(value: any): boolean
    {
        return this.isObjectLike(value) && !this.isPlainObject(value) && 'nodeType' in value
    }

    static isPrototype(value: any): boolean
    {
        return (
            (((typeof (value && value.constructor) === 'function') && value.constructor.prototype) || Object.prototype) === value
        )
    }

    static isNull(value: any): boolean
    {
        return value === null
    }

    static isUndefined(value: any): boolean
    {
        return typeof value === 'undefined'
    }

    static isBlob(value: any): boolean
    {
        return (
            this.isObjectLike(value)
            && this.isNumber(value.size)
            && this.isString(value.type)
            && this.isFunction(value.slice)
        )
    }

    static isFile(value: any): boolean
    {
        return (
            this.isBlob(value)
            && this.isObjectLike(value.lastModifiedDate)
            && this.isNumber(value.lastModified)
            && this.isString(value.name)
        )
    }

    static isFormData(value: any): boolean
    {
        return value instanceof FormData
    }
}