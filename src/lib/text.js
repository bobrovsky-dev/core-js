import Type from './type'

const reEscape = /[&<>'"]/g

const reUnescape = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g

const escapeEntities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
}

const unescapeEntities = {
    '&amp;': '&',
    '&#38;': '&',
    '&lt;': '<',
    '&#60;': '<',
    '&gt;': '>',
    '&#62;': '>',
    '&apos;': "'",
    '&#39;': "'",
    '&quot;': '"',
    '&#34;': '"',
}

export default class Text
{
    /**
     *
     * @param {string} value
     * @returns {string}
     */
    static encode(value)
    {
        if (Type.isString(value))
        {
            return value.replace(reEscape, item => escapeEntities[item])
        }

        return value
    }

    /**
     *
     * @param {string} value
     * @returns {string}
     */
    static decode(value)
    {
        if (Type.isString(value))
        {
            return value.replace(reUnescape, item => unescapeEntities[item])
        }

        return value
    }

    /**
     *
     * @param {number} length
     * @returns {string}
     */
    static getRandom(length = 8)
    {
        return [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
    }

    /**
     *
     * @param {string} str
     * @returns {string}
     */
    static toCamelCase(str)
    {
        if (Type.isEmpty(str))
        {
            return str
        }

        const regex = /[-_\s]+(.)?/g
        if (!regex.test(str))
        {
            return str.match(/^[A-Z]+$/) ? str.toLowerCase() : str[0].toLowerCase() + str.slice(1)
        }

        str = str.toLowerCase()
        str = str.replace(regex, function(match, letter) {
            return letter ? letter.toUpperCase() : ''
        });

        return str[0].toLowerCase() + str.substr(1)
    }

    /**
     *
     * @param {string} str
     * @returns {string}
     */
    static toPascalCase(str)
    {
        if (Type.isEmpty(str))
        {
            return str
        }

        return this.capitalize(this.toCamelCase(str))
    }

    /**
     *
     * @param {string} str
     * @returns {string}
     */
    static toKebabCase(str)
    {
        if (Type.isEmpty(str))
        {
            return str
        }

        const matches = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        if (!matches)
        {
            return str
        }

        return matches.map(x => x.toLowerCase()).join('-')
    }

    /**
     *
     * @param {string} str
     * @returns {string}
     */
    static capitalize(str)
    {
        if (Type.isEmpty(str))
        {
            return str
        }

        return str[0].toUpperCase() + str.substr(1)
    }

    /**
     *
     * @param {string} symbol
     * @param {string} string
     * @returns {boolean}
     */
    static isIn(symbol, string)
    {
        string = Type.toString(string)
        return string.indexOf(Type.toString(symbol)) !== -1
    }

    /**
     *
     * @param {string} value
     * @returns {string}
     */
    static trim(value)
    {
        if (Type.isString(value))
            return value.trim()

        return value
    }

    /**
     *
     * @param {string} string
     * @param {number} length
     * @param {string} suffix
     * @returns {string}
     */
    static truncate(string, length, suffix = "...")
    {
        string = Type.toString(string)
        return string.length > length ? this.trim(string.substr(0, length)) + suffix : string
    }

    /**
     *
     * @param {string} string
     * @param {object} rules
     * @param {string} tagStart
     * @param {string} tagEnd
     * @returns {string}
     */
    static replaceMacros(string, rules, tagStart = "#", tagEnd = "#")
    {
        if (Type.isObjectLike(rules))
        {
            let macros = {}

            Object.keys(rules).forEach(key => {
                macros[tagStart + key + tagEnd] = rules[key]
            })

            string = Text.replace(string, macros)
        }

        return string
    }

    /**
     *
     * @param {string} string
     * @param {object} rules
     * @param {string} flag
     * @returns {string}
     */
    static replace(string, rules, flag = 'g')
    {
        string = Type.toString(string)

        if (Type.isObjectLike(rules))
        {
            Object.keys(rules).forEach(key => {
                string = string.replace(new RegExp(key, flag), rules[key])
            })
        }

        return string
    }

    /**
     *
     * @param {string} value
     * @returns {string}
     */
    static nl2br(value)
    {
        if (!value || !value.replace)
            return value

        return value.replace(/([^>])\n/g, '$1<br/>')
    }

    /**
     *
     * @param {string} value
     * @returns {string}
     */
    static stripTags(value)
    {
        if (!value || !value.split)
            return value

        return value.split(/<[^>]+>/g).join('')
    }

    /**
     *
     * @param {string} value
     * @returns {string}
     */
    static stripPhpTags(value)
    {
        if (!value || !value.replace)
            return value

        return value.replace(/<\?(.|[\r\n])*?\?>/g, '')
    }

    /**
     * Взрывает строку в массив, опционально обрезает значения и пропускает пустые
     *
     * @param {string} value
     * @param {string} separator
     * @param {boolean} trim
     * @param {boolean} skipEmpty
     * @returns {array}
     */
    static explode(value, separator = ',', trim = true, skipEmpty = false)
    {
        value = Type.toString(value)
        let result = value.split(separator)
        if (!!trim)
        {
            result = result.map(i => this.trim(i))
        }
        if (skipEmpty)
        {
            result = result.filter(i => i !== "")
        }

        return result
    }

    /**
     * Метод для обрезания строк.
     *
     * @param {string} value
     * @param {number} offset
     * @param {number|null} length
     * @returns {string}
     */
    static cut(value, offset, length = null)
    {
        value = Type.toString(value)
        return value.substr(offset, length)
    }

    /**
     * Возвращает позицию подстроки в строке.
     *
     * @param {string} needle Подстрока.
     * @param {string} haystack Строка.
     * @param {number} offset Смещение.
     * @param {boolean} insensitive Нечювствительность к регистру.
     * @param {boolean} last Искать последнюю подстроку.
     * @returns {number|false} Позиция, с которой начинается первая или последняя найденная подстрока или `false`, если подстрока не найдена.
     */
    static position(needle, haystack, offset = 0, insensitive = false, last = false)
    {
        needle = Type.toString(needle)
        haystack = Type.toString(haystack)

        if (insensitive)
        {
            haystack = haystack.toLowerCase()
            needle = needle.toLowerCase()
        }

        let pos = haystack.indexOf(needle, offset)

        if (last)
        {
            offset = pos

            while (true)
            {
                let res = haystack.indexOf(needle, offset += 1)

                if (res == -1) break

                pos = res
            }
        }

        return pos >= 0 ? pos : false
    }
    
    /**
     * Сравнивкт две строки
     *
     * @param {string} value1 Первая строка для сравнения.
     * @param {string} value2 Вторая строка для сравнения.
     * @param {number} length Количество сравневаемых символов. Если 0, то сравнивает всю строку.
     * @param {boolean} insensitive Нечювствительность к регистру.
     * @returns {boolean} Результат сравнения.
     */
    static compare(value1, value2, length = 0, insensitive = false)
    {
        value1 = Type.toString(value1)
        value2 = Type.toString(value2)
        length = Type.toInteger(length)

        if (length > 0)
        {
            value1 = this.cut(value1, 0, length)
            value2 = this.cut(value2, 0, length)
        }

        return this.position(value1, value2, 0, insensitive, false) === 0
    }
}