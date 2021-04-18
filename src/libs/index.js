import { initType } from "./type"
import { initBrowser } from "./browser"
import { initUnicode } from "./unicode"
import { initArrays } from "./arrays"
import { initText } from "./text"
import { initInjector } from "./injector"
import { initEvents } from "./events/index"

export function initLibs (B)
{
    initType(B)
    initBrowser(B)
    initUnicode(B)
    initArrays(B)
    initText(B)
    initInjector(B)
    initEvents(B)
}