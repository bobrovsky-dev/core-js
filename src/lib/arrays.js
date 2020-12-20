import Type from "./type"

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
}