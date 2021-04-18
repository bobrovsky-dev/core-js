import Type from "./type"
import Text from "./text"

export function initArrays (B)
{
    B.extend({
        arrays: Arrays
    })
}

export default class Arrays
{
    static getValues(array, clean = true)
    {
        if (Type.isArray(array))
            return clean ? Arrays.clean(array) : array

        if(Type.isObject(array))
        {
            array = Object.values(array)
            return clean ? Arrays.clean(array) : array
        }

        return []
    }

    static getFirstValue(array, defaultValue = null, clean = true)
    {
        let values = Arrays.getValues(array, clean)
        return values.length ? values[0] : defaultValue
    }

    static getLastValue(array, defaultValue = null, clean = true)
    {
        let values = Arrays.getValues(array, clean)
        return values.length ? values[values.length - 1] : defaultValue
    }

    static getKeys(array, convertKeyToString = false)
    {
        if (Type.isArray(array))
            return array.map((v, i) => convertKeyToString ? i.toString() : i)

        if(Type.isObject(array))
            return Object.keys(array)

        return []
    }

    static getFirstKey(array, defaultValue = null, convertString = false)
    {
        let keys = Arrays.getKeys(array, convertString)
        return keys.length ? keys[0] : defaultValue
    }

    static getLastKey(array, defaultValue = null, convertString = false)
    {
        let keys = Arrays.getKeys(array, convertString)
        return keys.length ? keys[keys.length - 1] : defaultValue
    }

    static clean(array)
    {
        if (Type.isArray(array))
            return array.filter(value => !Type.isNil(value))

        return []
    }

    static keyExists(key, array)
    {
        if (Type.isArray(array))
            return array.hasOwnProperty(key)

        if (Type.isObject(array))
            return key in array

        return false
    }

    static isIn(value, array)
    {
        if (Type.isArray(array))
            return array.indexOf(value) >= 0

        if (Type.isObject(array))
        {
            let keys = Object.keys(array)
            for (let key of keys)
            {
                if (array[key] === value)
                {
                    return true
                }
            }
        }

        return false
    }

    static getRootValue(array, key, defaultValue)
    {
        return Arrays.keyExists(key, array) ? array[key] : defaultValue
    }

    static getValue(array, key, defaultValue = null)
    {
        if (Type.isFunction(key))
            return key(array, defaultValue)

        if (Type.isArray(key))
        {
            let lastKey = key.pop()

            for (let keyPart of key)
            {
                array = Arrays.getValue(array, keyPart)
            }

            key = lastKey
        }

        if ((Type.isArray(key) || Type.isObject(key)) && Arrays.keyExists(key, array))
            return array[key]

        let pos = Text.position(".", key)

        if (pos !== false)
        {
            array = Arrays.getValue(array, Type.toString(key).substr(0, pos), defaultValue)
            key = Type.toString(key).substr(pos + 1)

            return Arrays.getValue(array, key, defaultValue)
        }

        return Arrays.keyExists(key, array) ? array[key] : defaultValue
    }

    static remove(array, key, defaultValue = null)
    {
        if (Arrays.keyExists(key, array))
        {
            let value = array[key]
            if (Type.isArray(array))
                array.splice(array.indexOf(key), 1)

            if (Type.isObject(array))
                delete array[key]

            return value
        }

        return defaultValue
    }

    static removeValue(array, value, defaultValue = null)
    {
        let result = defaultValue
        if (Type.isArray(array))
        {
            for (let key in array)
            {
                if (array.hasOwnProperty(key))
                {
                    let val = array[key]

                    if (val === value)
                    {
                        result = key
                        Arrays.remove(array, key)
                    }
                }
            }
        }
        else if (Type.isObject(array))
        {
            let keys = Object.keys(array)
            for (let key of keys)
            {
                if (array[key] === value)
                {
                    result = key
                    Arrays.remove(array, key)
                }
            }
        }

        return result
    }

    static getColumn(array, name, keepKeys = true)
    {
        let result = []
        let resultObject = {}

        if (Type.isObject(array))
        {
            let keys = Arrays.getKeys(array);

            for (let key of keys)
            {
                let value = array[key]
                if (keepKeys)
                {
                    resultObject[key] = Arrays.getValue(value, name)
                }
                else
                {
                    result.push(Arrays.getValue(value, name))
                }
            }
        }
        else if (Type.isArray(array))
        {
            for (let value of array)
            {
                result.push(Arrays.getValue(value, name))
            }
        }

        return keepKeys ? resultObject : result
    }

    static strictIndexOf(array, value, fromIndex)
    {
        let index = fromIndex - 1
        const { length } = array

        while (++index < length)
        {
            if (array[index] === value)
            {
                return index
            }
        }
        return -1
    }

    static baseIndexOf(array, value, fromIndex)
    {
        return value === value
            ? Arrays.strictIndexOf(array, value, fromIndex)
            : Arrays.baseFindIndex(array, function (value) {
                return value !== value
            }, fromIndex)
    }

    static baseFindIndex(array, predicate, fromIndex, fromRight)
    {
        const { length } = array
        let index = fromIndex + (fromRight ? 1 : -1)

        while ((fromRight ? index-- : ++index < length))
        {
            if (predicate(array[index], index, array))
            {
                return index
            }
        }
        return -1
    }

    static slice(array, start, end)
    {
        let length = array == null ? 0 : array.length
        if (!length)
        {
            return []
        }
        start = start == null ? 0 : start
        end = end === undefined ? length : end

        if (start < 0)
        {
            start = -start > length ? 0 : (length + start)
        }
        end = end > length ? length : end
        if (end < 0)
        {
            end += length
        }
        length = start > end ? 0 : ((end - start) >>> 0)
        start >>>= 0

        let index = -1
        const result = new Array(length)
        while (++index < length)
        {
            result[index] = array[index + start]
        }
        return result
    }

    static castSlice(array, start, end)
    {
        const { length } = array
        end = end === undefined ? length : end
        return (!start && end >= length) ? array : Arrays.slice(array, start, end)
    }

    static chunk(array, size = 1)
    {
        size = Math.max(Type.toInteger(size), 0)
        const length = array == null ? 0 : array.length
        if (!length || size < 1)
        {
            return []
        }
        let index = 0
        let resIndex = 0
        const result = new Array(Math.ceil(length / size))

        while (index < length)
        {
            result[resIndex++] = Arrays.slice(array, index, (index += size))
        }
        return result
    }
}