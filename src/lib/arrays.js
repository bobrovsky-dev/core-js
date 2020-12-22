import Type from "./type"
import Text from "./text";

export default class Arrays
{
    /**
     * Возвращает значения массива или объекта с новыми ключами
     *
     * @param {array|object} array
     * @param {boolean} clean
     * @returns {array}
     */
    static getValues(array, clean = true)
    {
        if (Type.isArray(array))
            return clean ? this.clean(array) : array

        if(Type.isObjectLike(array))
        {
            array = Object.values(array)
            return clean ? this.clean(array) : array
        }

        return []
    }

    /**
     * Возвращает первое значение массива или объекта
     * @param {array|object} array
     * @param {mixed} defaultValue
     * @param {boolean} clean
     * @returns {mixed}
     */
    static getFirstValue(array, defaultValue = null, clean = true)
    {
        let values = this.getValues(array, clean)
        return values.length ? values[0] : defaultValue
    }

    /**
     * Возвращает последнее значение массива или объекта
     * @param {array|object} array
     * @param {mixed} defaultValue
     * @param {boolean} clean
     * @returns {mixed}
     */
    static getLastValue(array, defaultValue = null, clean = true)
    {
        let values = this.getValues(array, clean)
        return values.length ? values[values.length - 1] : defaultValue
    }

    /**
     * Возвращает массив ключей массива или объекта
     *
     * @param {array|object} array
     * @param {boolean} convertString
     * @returns {array}
     */
    static getKeys(array, convertString = false)
    {
        if (Type.isArray(array))
            return array.map((v, i) => convertString ? i.toString() : i)

        if(Type.isObjectLike(array))
            return Object.keys(array)

        return []
    }

    /**
     * Возвращает первый ключ массива или объекта
     *
     * @param {array|object} array
     * @param {mixed} defaultValue
     * @param {boolean} convertString
     * @returns {mixed}
     */
    static getFirstKey(array, defaultValue = null, convertString = false)
    {
        let keys = this.getKeys(array, convertString)
        return keys.length ? keys[0] : defaultValue
    }

    /**
     * Возвращает последний ключ массива или объекта
     *
     * @param {array|object} array
     * @param {mixed} defaultValue
     * @param {boolean} convertString
     * @returns {mixed}
     */
    static getLastKey(array, defaultValue = null, convertString = false)
    {
        let keys = this.getKeys(array, convertString)
        return keys.length ? keys[keys.length - 1] : defaultValue
    }

    /**
     * Очищает значения массива от null или undefined
     *
     * @param {array} array
     * @returns {array}
     */
    static clean(array)
    {
        if (Type.isArray(array))
            return array.filter(value => !Type.isNil(value))

        return []
    }

    /**
     * Проверяет, присутствует ли в массиве или объекте указанный ключ
     *
     * @param {string|number} key
     * @param {array|object} array
     * @returns {boolean}
     */
    static keyExists(key, array)
    {
        if (Type.isArray(array) || Type.isObjectLike(array))
            return array.hasOwnProperty(key)

        return false
    }

    /**
     * Проверяет, присутствует ли в массиве или объекте значение
     *
     * @param {mixed} value
     * @param {array|object} array
     * @returns {boolean}
     */
    static isIn(value, array)
    {
        if (Type.isArray(array))
            return array.indexOf(value) >= 0

        if (Type.isObjectLike(array))
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

    /**
     *  Возращает значение элемента, если оно найдено, в противном случае значение по умолчанию
     *
     * @param {array} array
     * @param {string|number} key
     * @param {mixed} defaultValue
     * @returns {mixed}
     */
    static getRootValue(array, key, defaultValue)
    {
        return this.keyExists(key, array) ? array[key] : defaultValue
    }

    /**
     * Извлекает значение элемента массива или объекта с заданным ключом или именем свойства.
     * Если ключ не существует в массиве или объекте, вместо него будет возвращено значение по умолчанию.
     *
     * Ниже приведены некоторые примеры использования,
     *
     * работа с массивом
     * B.Arrays.getValue(array, 1)
     *
     * работа с объектом
     * B.Arrays.getValue(object, 'one')
     *
     * работа с функцией
     * B.Arrays.getValue(user, function(user, default, value) {
     *     return user.firstName + ' ' + user.lastName
     * })
     *
     * использование точечного формата для получения значения встроенного объекта или массива
     *
     * B.Arrays.getValue(array, '1.2')
     * B.Arrays.getValue(array, [1, 2])
     * B.Arrays.getValue(object, 'one.two')
     * B.Arrays.getValue(object, ['one', 'two'])
     *
     *
     * @param {array|object} array
     * @param {string|number|function|array} key
     * @param {mixed} defaultValue
     * @returns {mixed}
     */
    static getValue(array, key, defaultValue = null)
    {
        if (Type.isFunction(key))
            return key(array, defaultValue)

        if (Type.isArray(key))
        {
            let lastKey = key.pop()

            for (let keyPart of key)
            {
                array = this.getValue(array, keyPart)
            }

            key = lastKey
        }

        if ((Type.isArray(key) || Type.isObjectLike(key)) && this.keyExists(key, array))
            return array[key]

        let pos = Text.position(".", key)

        if (pos !== false)
        {
            array = this.getValue(array, Type.toString(key).substr(0, pos), defaultValue)
            key = Type.toString(key).substr(pos + 1)

            return this.getValue(array, key, defaultValue)
        }

        return this.keyExists(key, array) ? array[key] : defaultValue
    }

    /**
     * Удаляет значение массива или объекта по ключу
     *
     * @param {array|object} array
     * @param {string|number} key
     * @param {mixed} defaultValue
     * @returns {mixed} Возвращает значение элемента массива или объекта, если оно удалилось, в противном случае значение по умолчанию
     */
    static remove(array, key, defaultValue = null)
    {
        if (this.keyExists(key, array))
        {
            let value = array[key]
            if (Type.isArray(array))
                array.splice(array.indexOf(key), 1)

            if (Type.isObjectLike(array))
                delete array[key]

            return value
        }

        return defaultValue
    }

    /**
     * Удаляет значение массива или объекта по значению
     *
     * @param {array|object} array
     * @param {string|number} value
     * @param {mixed} defaultValue
     * @returns {mixed}
     */
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
                        this.remove(array, key)
                        break
                    }
                }
            }
        }
        else if (Type.isObjectLike(array))
        {
            let keys = Object.keys(array)
            for (let key of keys)
            {
                if (array[key] === value)
                {
                    result = key
                    this.remove(array, key)
                    break
                }
            }
        }

        return result
    }

    /**
     * Возвращает значения указанного столбца в массиве.
     * Входной массив должен быть многомерным или массивом объектов.
     *
     * Например,
     * let array = [
     *      {id: '123', data: 'abc'}
     *      {id: '345', data: 'def'}
     * ];
     *
     * let result = Arrays.getColumn(array, 'id');
     * // в результате получается: ['123', '345']
     *
     * // использование анонимной функции
     * let result = Arrays.getColumn(array, function(element), {
     *    return element.id;
     * });
     *
     * @param {array|object} array
     * @param {number|string|function} name
     * @param {boolean} keepKeys
     * @returns {array|object} список значений столбцов
     */
    static getColumn(array, name, keepKeys = true)
    {
        let result = []
        let resultObject = {}

        if (Type.isObjectLike(array))
        {
            let keys = this.getKeys(array);

            for (let key of keys)
            {
                let value = array[key]
                if (keepKeys)
                {
                    resultObject[key] = this.getValue(value, name)
                }
                else
                {
                    result.push(this.getValue(value, name))
                }
            }
        }
        else if (Type.isArray(array))
        {
            for (let value of array)
            {
                result.push(this.getValue(value, name))
            }
        }

        return keepKeys ? resultObject : result
    }
}