import Type from './type'
import Unicode from "./unicode"
import Arrays from "./arrays"

const reEscape = /[&<>'"]/g

const reUnescape = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34);/g

const escapeEntities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
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
    '&#34;': '"'
}

export function initText (B)
{
    B.extend({
        text: Text
    })
}

export default class Text
{
    static encode(value)
    {
        if (Type.isString(value))
        {
            return value.replace(reEscape, item => escapeEntities[item])
        }

        return value
    }

    static decode(value)
    {
        if (Type.isString(value))
        {
            return value.replace(reUnescape, item => unescapeEntities[item])
        }

        return value
    }

    static getRandom(length = 8)
    {
        return [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('')
    }

    static toCamelCase(str)
    {
        if (Type.isString(str) && Type.isEmptyString(str))
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

    static toPascalCase(str)
    {
        if (Type.isEmpty(str))
        {
            return str
        }

        return Text.capitalize(Text.toCamelCase(str))
    }

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

    static capitalize(str)
    {
        if (Type.isEmpty(str))
        {
            return str
        }

        return str[0].toUpperCase() + str.substr(1)
    }

    static isIn(symbol, string)
    {
        string = Type.toString(string)
        return string.indexOf(Type.toString(symbol)) !== -1
    }

    static trim(value, chars = undefined)
    {
        value = Type.toString(value)

        if (chars === undefined)
            return value.trim()

        const strSymbols = Text.toArray(value)
        const chrSymbols = Text.toArray(chars)
        const start = Text.charsStartIndex(strSymbols, chrSymbols)
        const end = Text.charsEndIndex(strSymbols, chrSymbols) + 1

        return Arrays.castSlice(strSymbols, start, end).join('')
    }

    static trimLeft(string, chars)
    {
        string = Type.toString(string)

        if (string.length && chars === undefined)
            return string[(''.trimLeft ? 'trimLeft' : 'trimStart')]()

        if (!string.length || !chars)
            return ""

        const strSymbols = Text.toArray(string)
        const start = Text.charsStartIndex(strSymbols, Text.toArray(chars))
        return Arrays.castSlice(strSymbols, start).join('')
    }

    static trimRight(string, chars)
    {
        string = Type.toString(string)

        if (string.length && chars === undefined)
            return string[(''.trimRight ? 'trimRight': 'trimEnd')]()

        if (!string.length || !chars)
            return ""

        const strSymbols = Text.toArray(string)
        const end = Text.charsEndIndex(strSymbols, Text.toArray(chars)) + 1
        return Arrays.castSlice(strSymbols, 0, end).join('')
    }

    static charsStartIndex(strSymbols, chrSymbols)
    {
        let index = -1
        const length = strSymbols.length

        while (++index < length && Arrays.baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
        return index
    }

    static charsEndIndex(strSymbols, chrSymbols)
    {
        let index = strSymbols.length

        while (index-- && Arrays.baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
        return index
    }

    static toArray(value)
    {
        return Unicode.has(value)
            ? Unicode.toArray(value)
            : value.split('')
    }

    static replaceSubstring(string, replacement, start, length = null)
    {
        string = Type.toString(string)
        let stringLength = string.length

        if (start < 0)
            start = Math.max(0, stringLength + start)
        else if (start > stringLength)
            start = stringLength

        if (length !== null && length < 0)
            length = Math.max(0, stringLength - start + length)
        else if (length === null || length > stringLength)
            length = stringLength

        if ((start + length) > stringLength)
            length = stringLength - start

        return string.substr(0, start) + replacement + string.substr(start + length, stringLength - start - length)
    }

    static truncateBegin(string, length, trimMarker = "...")
    {
        string = Type.toString(string)
        let stringLength = string.length
        if (stringLength <= length)
            return string

        trimMarker = Type.toString(trimMarker)
        let trimMarkerLength = trimMarker.length

        return Text.replaceSubstring(string, trimMarker, 0, -length + trimMarkerLength)
    }

    static truncateMiddle(string, length, trimMarker = "...")
    {
        string = Type.toString(string)
        let stringLength = string.length
        if (stringLength <= length)
            return string

        trimMarker = Type.toString(trimMarker)
        let trimMarkerLength = trimMarker.length

        let start = Type.toInteger(Math.ceil((length - trimMarkerLength) / 2))
        let end = length - start - trimMarkerLength

        return Text.replaceSubstring(string, trimMarker, start, -end)
    }

    static truncateEnd(string, length, trimMarker = "...")
    {
        string = Type.toString(string)
        let stringLength = string.length
        if (stringLength <= length)
            return string

        trimMarker = Type.toString(trimMarker)
        let trimMarkerLength = trimMarker.length

        return Text.trim(string.substr(0, length - trimMarkerLength)) + trimMarker
    }

    static replaceMacros(string, rules, tagStart = "#", tagEnd = "#")
    {
        if (Type.isObject(rules))
        {
            let macros = {}

            Object.keys(rules).forEach(key => {
                macros[tagStart + key + tagEnd] = rules[key]
            })

            string = Text.replace(string, macros)
        }

        return string
    }

    static replace(string, rules, flag = 'g')
    {
        string = Type.toString(string)

        if (Type.isObject(rules))
        {
            Object.keys(rules).forEach(key => {
                string = string.replace(new RegExp(key, flag), rules[key])
            })
        }

        return string
    }

    static nl2br(value)
    {
        if (!value || !value.replace)
            return value

        return value.replace(/([^>])\n/g, '$1<br/>')
    }

    static stripTags(value)
    {
        if (!value || !value.split)
            return value

        return value.split(/<[^>]+>/g).join('')
    }

    static stripPhpTags(value)
    {
        if (!value || !value.replace)
            return value

        return value.replace(/<\?(.|[\r\n])*?\?>/g, '')
    }

    static explode(value, separator = ',', trim = true, skipEmpty = false)
    {
        value = Type.toString(value)
        let result = value.split(separator)
        if (!!trim)
        {
            result = result.map(i => Text.trim(i))
        }
        if (skipEmpty)
        {
            result = result.filter(i => i !== "")
        }

        return result
    }

    static cut(value, offset, length = null)
    {
        value = Type.toString(value)
        return value.substr(offset, length)
    }

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

    static compare(value1, value2, length = 0, insensitive = false)
    {
        value1 = Type.toString(value1)
        value2 = Type.toString(value2)
        length = Type.toInteger(length)

        if (length > 0)
        {
            value1 = Text.cut(value1, 0, length)
            value2 = Text.cut(value2, 0, length)
        }

        return Text.position(value1, value2, 0, insensitive, false) === 0
    }
}