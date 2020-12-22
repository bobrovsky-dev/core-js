import Type from "./type"
import Text from "./text"

export default class Arrays
{
    /**
     * Возвращает значения с новыми ключами
     *
     * @param {array|object} array Массив или объект
     * @param {boolean} clean Нужно ли очищать от null и undefined
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
     * Возвращает первое значение, или значение по умолчанию
     *
     * @param {array|object} array Массив или объект
     * @param {mixed} defaultValue Значение по умолчанию
     * @param {boolean} clean Нужно ли очищать от null и undefined
     * @returns {mixed}
     */
    static getFirstValue(array, defaultValue = null, clean = true)
    {
        let values = this.getValues(array, clean)
        return values.length ? values[0] : defaultValue
    }

    /**
     * Возвращает последнее значение, или значение по умолчанию
     *
     * @param {array|object} array Массив или объект
     * @param {mixed} defaultValue Значение по умолчанию
     * @param {boolean} clean Нужно ли очищать от null и undefined
     * @returns {mixed}
     */
    static getLastValue(array, defaultValue = null, clean = true)
    {
        let values = this.getValues(array, clean)
        return values.length ? values[values.length - 1] : defaultValue
    }

    /**
     * Возвращает массив ключей
     *
     * @param {array|object} array Массив или объект
     * @param {boolean} convertKeyToString Конвертировать ключи массива в строку
     * @returns {array}
     */
    static getKeys(array, convertKeyToString = false)
    {
        if (Type.isArray(array))
            return array.map((v, i) => convertKeyToString ? i.toString() : i)

        if(Type.isObjectLike(array))
            return Object.keys(array)

        return []
    }

    /**
     * Возвращает первый ключ, или значение по умолчанию
     *
     * @param {array|object} array Массив или объект
     * @param {mixed} defaultValue Значение по умолчанию
     * @param {boolean} convertString Конвертировать ключи массива в строку
     * @returns {mixed}
     */
    static getFirstKey(array, defaultValue = null, convertString = false)
    {
        let keys = this.getKeys(array, convertString)
        return keys.length ? keys[0] : defaultValue
    }

    /**
     * Возвращает последний ключ, или значение по умолчанию
     *
     * @param {array|object} array Массив или объект
     * @param {mixed} defaultValue Значение по умолчанию
     * @param {boolean} convertString Конвертировать ключи массива в строку
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
     * @param {array} array Массив
     * @returns {array} Очищенный массив
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
     * @param {string|number} key Ключ
     * @param {array|object} array Массив или объект
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
     * @param {mixed} value Значение
     * @param {array|object} array Массив или объект
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
     *  Возращает значение элемента, если оно найдено, или значение по умолчанию
     *
     * @param {array|object} array Массив или объект
     * @param {string|number} key Ключ
     * @param {mixed} defaultValue Значение по умолчанию
     * @returns {mixed}
     */
    static getRootValue(array, key, defaultValue)
    {
        return this.keyExists(key, array) ? array[key] : defaultValue
    }

    /**
     * Извлекает значение элемента массива или объекта с заданным ключом
     * Если ключ не существует в массиве или объекте, вместо него будет возвращено значение по умолчанию
     *
     * Ниже приведены некоторые примеры использования,
     *
     * работа с массивом:
     * let array = [
     *      "первое значение",
     *      "второе значение",
     * ]
     *
     * Arrays.getValue(array, 1)
     * вернет "второе значение"
     *
     *
     * работа с объектом:
     * let object = {
     *     one: "1",
     *     two: "2"
     * }
     *
     * Arrays.getValue(object, 'one')
     * вернет "1"
     *
     *
     *
     * работа с функцией:
     * let user = {
     *     firstName: "Имя",
     *     lastName: "Фамилия"
     * }
     *
     * B.Arrays.getValue(user, function(user, defaultValue) {
     *     return user.firstName + ' ' + user.lastName
     * })
     * вернет "Имя Фамилия"
     *
     * использование точечного формата для получения значения встроенного объекта или массива
     *
     * let array = [
     *      ["Яблоко", "Груша", "Слива"],
     *      ["Апельсин", "Мандарин"],
     * ]
     *
     * Arrays.getValue(array, '0.2') или Arrays.getValue(array, [0, 2])
     * вернет "Слива"
     *
     * let object = {
     *      one: {
     *          two: {
     *              three: "Значение three"
     *          }
     *      }
     * }
     *
     *
     * Arrays.getValue(object, 'one.two.three') или Arrays.getValue(object, ['one', 'two', 'three'])
     * вернет "Значение three"
     *
     *
     * @param {array|object} array Массив или объект
     * @param {string|number|function|array} key Ключ
     * @param {mixed} defaultValue Значение по умолчанию
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
     * @param {array|object} array Массив или объект
     * @param {string|number} key Ключ
     * @param {mixed} defaultValue Значение по умолчанию
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
     * Удаляет значения массива или объекта по переданному значению
     *
     * @param {array|object} array Массив или объект
     * @param {string|number} value Ключ
     * @param {mixed} defaultValue Значение по умолчанию
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
     * в результате получается: ['123', '345']
     *
     * использование анонимной функции
     * let result = Arrays.getColumn(array, function(element), {
     *    return element.id;
     * });
     *
     * @param {array|object} array Массив или объект
     * @param {number|string|function} name Название ключа столбца
     * @param {boolean} keepKeys Если false, то результирующий массив будет переиндексирован целыми числами.
     * @returns {array|object} Список значений столбцов
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