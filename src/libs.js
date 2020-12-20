import Type from './lib/type'
import Browser from './lib/browser'
import Event from './lib/event'
import Text from './lib/text'

export const type = {
    ...Object.getOwnPropertyNames(Type)
        .filter(key => !['name', 'length', 'prototype', 'caller', 'arguments'].includes(key))
        .reduce((acc, key) => {
            acc[key] = Type[key]
            return acc
        }, {}),
    isNotEmptyString: value => Type.isString(value) && value !== '',
    isNotEmptyObject: value => Type.isObjectLike(value) && Object.keys(value).length > 0,
    isMapKey: Type.isObject,
    stringToInt: (value) => {
        const parsed = parseInt(value)
        return !Number.isNaN(parsed) ? parsed : 0
    },
}

export const browser = {
    IsOpera: Browser.isOpera,
    IsIE: Browser.isIE,
    IsIE6: Browser.isIE6,
    IsIE7: Browser.isIE7,
    IsIE8: Browser.isIE8,
    IsIE9: Browser.isIE9,
    IsIE10: Browser.isIE10,
    IsIE11: Browser.isIE11,
    IsSafari: Browser.isSafari,
    IsFirefox: Browser.isFirefox,
    IsChrome: Browser.isChrome,
    DetectIeVersion: Browser.detectIEVersion,
    IsMac: Browser.isMac,
    IsAndroid: Browser.isAndroid,
    isIPad: Browser.isIPad,
    isIPhone: Browser.isIPhone,
    IsIOS: Browser.isIOS,
    IsMobile: Browser.isMobile,
    isRetina: Browser.isRetina,
    IsDoctype: Browser.isDoctype,
    SupportLocalStorage: Browser.isLocalStorageSupported,
    addGlobalClass: Browser.addGlobalClass,
    DetectAndroidVersion: Browser.detectAndroidVersion,
    isPropertySupported: Browser.isPropertySupported,
    addGlobalFeatures: Browser.addGlobalFeatures,
}

export const event = new Event()

export const {
    on,
    off,
    trigger,
} = event

export const {
    getRandom,
    replaceMacros,
} = Text
