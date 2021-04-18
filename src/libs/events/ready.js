import Type from "../type"

let stack = []

export let isReady = false

export function ready (handler)
{
    switch (document.readyState)
    {
        case 'loading':
            stack.push(handler)
            break;
        case 'interactive':
        case 'complete':
            if (Type.isFunction(handler))
            {
                handler()
            }
            isReady = true
            break
        default:
            break
    }
}

document.addEventListener('readystatechange', () => {
    if (!isReady)
    {
        stack.forEach(ready)
        stack = []
    }
})