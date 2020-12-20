export default class Type
{
    /**
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isEmpty(value)
    {
        if (this.isArray(value) || this.isString(value))
            return value.length === 0

        if (this.isNumber(value))
            return value === 0

        if (this.isBoolean(value))
            return value === false

        if (this.isObject(value))
            return this.isEmpty(Object.getOwnPropertyNames(value))

        return this.isNil(value)
    }

    /**
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isString(value)
    {
        return typeof value === 'string'
    }

    /**
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isSymbol(value)
    {
        const type = typeof value
        return type == 'symbol' || (type === 'object' && value != null && Object.prototype.toString.call(value) == '[object Symbol]')
    }

    /**
     *
     * @param {*} value
     * @returns {string}
     */
    static toString(value)
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

    /**
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isFunction(value)
    {
        return typeof value === 'function'
    }

    /**
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isObject(value)
    {
        return !!value && (typeof value === 'object' || typeof value === 'function')
    }

    /**
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isObjectLike(value)
    {
        return !!value && typeof value === 'object'
    }

    /**
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isPlainObject(value)
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

    /**
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isBoolean(value)
    {
        return value === true || value === false
    }

    /**
     *
     * @param {any} value
     * @param {array} trueValues
     * @returns {boolean}
     */
    static toBoolean(value, trueValues = [])
    {
        const transformedValue = this.isString(value) ? value.toLowerCase() : value
        return ['true', 'y', '1', 1, true, ...trueValues].includes(transformedValue)
    }

    /**
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isNumber(value)
    {
        return typeof value === 'number' && !isNaN(value)
    }

    /**
     *
     * @param {*} value
     * @returns {number}
     */
    static toNumber(value)
    {
        let parsedValue = parseFloat(value)
        return this.isNumber(parsedValue) ? parsedValue : 0
    }

    /**
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isInteger(value)
    {
        return this.isNumber(value) && (value % 1) === 0
    }

    /**
     *
     * @param {*} value
     * @returns {number}
     */
    static toInteger(value)
    {
        return this.toNumber(parseInt(value, 10))
    }

    /**
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isFloat(value)
    {
        return this.isNumber(value) && !this.isInteger(value)
    }

    /**
     *
     * @param {any} value
     * @returns {number}
     */
    static toFloat(value)
    {
        return parseFloat(value)
    }

    /**
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isNil(value)
    {
        return value === null || value === undefined
    }


    /**
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isArray(value)
    {
        return !this.isNil(value) && Array.isArray(value)
    }

    /**
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isDate(value)
    {
        return this.isObjectLike(value) && Object.prototype.toString.call(value) === '[object Date]'
    }

    /**
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isDomNode(value)
    {
        return this.isObjectLike(value) && !this.isPlainObject(value) && 'nodeType' in value
    }

    /**
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isPrototype(value)
    {
        return (
            (((typeof (value && value.constructor) === 'function') && value.constructor.prototype) || Object.prototype) === value
        )
    }

    /**
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isNull(value)
    {
        return value === null
    }

    /**
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isUndefined(value)
    {
        return typeof value === 'undefined'
    }

    /**
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isBlob(value)
    {
        return (
            this.isObjectLike(value)
            && this.isNumber(value.size)
            && this.isString(value.type)
            && this.isFunction(value.slice)
        )
    }

    /**
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isFile(value)
    {
        return (
            this.isBlob(value)
            && this.isObjectLike(value.lastModifiedDate)
            && this.isNumber(value.lastModified)
            && this.isString(value.name)
        )
    }

    /**
     *
     * @param {*} value
     * @returns {boolean}
     */
    static isFormData(value)
    {
        return value instanceof FormData
    }
}