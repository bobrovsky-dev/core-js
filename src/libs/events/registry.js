import Type from '../type'

const registry = new WeakMap()

export class Registry
{
    set(target, event, listener)
    {
        const events = this.get(target)

        if (!Type.isArray(events[event]))
        {
            events[event] = []
        }

        events[event].push(listener)

        registry.set(target, events)
    }

    get(target)
    {
        return registry.get(target) || {}
    }

    has(target, event, listener)
    {
        if (event && listener)
        {
            return (
                registry.has(target)
                && registry.get(target)[event].indexOf(listener) >= 0
            )
        }

        return registry.has(target)
    }

    delete(target, event, listener)
    {
        if (Type.isString(event) && Type.isFunction(listener))
        {
            const events = registry.get(target)

            if (Type.isPlainObject(events) && Type.isArray(events[event]))
            {
                const cbs = events[event]

                let cb
                let i = cbs.length
                while (i--)
                {
                    cb = cbs[i]
                    if (cb === listener || cb.listener === listener)
                    {
                        cbs.splice(i, 1)
                    }
                }
            }

            return
        }

        if (Type.isString(event))
        {
            const events = registry.get(target)

            if (Type.isPlainObject(events) && Type.isArray(events[event]))
            {
                events[event] = []
            }

            return
        }

        registry.delete(target)
    }
}

export default new Registry()