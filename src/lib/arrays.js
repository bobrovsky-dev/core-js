import Type from "./type"
import Text from "./text";

export default class Arrays
{
    /**
     * Возвращает значения массива с новыми ключами
     *
     * @param {array|object} array
     * @returns {array}
     */
    static getValues(array)
    {
        if (Type.isArray(array))
            return this.clean(array)

        return this.getValuesObject(array)
    }

    /**
     * Возвращает массив ключей массива
     *
     * @param {array|object} array
     * @param {boolean} convertString
     * @returns {array}
     */
    static getKeys(array, convertString = false)
    {
        if (Type.isArray(array))
            return this.clean(array.map((v, i) => convertString ? i.toString() : i))

        return this.getKeysObject(array)
    }

    /**
     * Возвращает массив значений объекта
     *
     * @param {object} object
     * @returns {array}
     */
    static getValuesObject(object)
    {
        if(Type.isObjectLike(object))
            return this.clean(Object.values(object))

        return []
    }

    /**
     * Возвращает массив ключей объекта
     *
     * @param {object} object
     * @returns {array}
     */
    static getKeysObject(object)
    {
        if(Type.isObjectLike(object))
            return this.clean(Object.keys(object))

        return []
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
        if (Type.isArray(array))
            return array.hasOwnProperty(key)

        if (Type.isObjectLike(array))
            return key in array

        return false
    }

    /**
     * Проверяет, присутствует ли в массиве или объекте значение
     *
     * @param value
     * @param array
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
        if (Type.isArray(array) && this.keyExists(key, array))
        {
            let value = array[key]
            array.splice(array.indexOf(key), 1)
            return value
        }

        if (Type.isObjectLike(array))
        {
            return this.removeFromObject(array, key, defaultValue)
        }

        return defaultValue
    }

    /**
     * Удаляет значение массива или объекта по ключу
     *
     * @param {object} object
     * @param {string} key
     * @param {mixed} defaultValue
     * @returns {mixed} Возвращает значение элемента массива или объекта, если оно удалилось, в противном случае значение по умолчанию
     */
    static removeFromObject(object, key, defaultValue = null)
    {
        if (Type.isObjectLike(object) && this.keyExists(key, object))
        {
            let value = object[key]
            delete object[key]
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

        if (Type.isObjectLike(array))
        {
            return this.removeValueFromObject(array, value, defaultValue)
        }

        return result
    }

    /**
     * Удаляет значение объекта по значению
     *
     * @param {object} object
     * @param {string|number} value
     * @param {mixed} defaultValue
     * @returns {mixed}
     */
    static removeValueFromObject(object, value, defaultValue = null)
    {
        let result = defaultValue

        if (Type.isObjectLike(object))
        {
            let keys = Object.keys(object)
            for (let key of keys)
            {
                if (object[key] === value)
                {
                    result = key
                    this.remove(object, key)
                    break
                }
            }
        }

        return result
    }

}