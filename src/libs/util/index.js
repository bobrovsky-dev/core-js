export function getProperties (target, keys = [])
{
    const bKeys = !!keys && Array.isArray(keys) && keys.length > 0

    return Object.getOwnPropertyNames(target)
        .filter(key => !['name', 'length', 'prototype', 'caller', 'arguments'].includes(key))
        .reduce((acc, key) => {
            if ((bKeys && keys.indexOf(key) >= 0) || !bKeys)
            {
                acc[key] = target[key]
            }
            return acc || {}
        }, {})
}