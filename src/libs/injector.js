import Type from "./type"

export function initInjector (B)
{
    B.extend({
        invoke
    })
}

export function invoke (handler, context, args)
{
    if (!Type.isFunction(handler))
        return

    let res
    try {
        res = args ? handler.apply(context, args) : handler.call(context)
        if (res && Type.isPromise(res))
        {
            res.catch(e => console.error(e))
        }
    } catch (e) {
        console.error(e)
    }
    return res
}