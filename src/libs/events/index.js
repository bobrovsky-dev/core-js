import Type from "../type"
import Registry from "./registry"
import { getProperties } from "../util/index"
import { ready } from './ready'
import { invoke } from '../injector'

export function initEvents (B)
{
    B.extend({
        events: Events,
        ...getProperties(Events),
        ready
    })
}

export default class Events
{
    static $on (target, event, listener)
    {
        if (Type.isArray(event))
        {
            for (let i = 0, l = event.length; i < l; i++)
            {
                Events.$on(target, event[i], listener)
            }
            return
        }

        Registry.set(target, event, listener)
    }

    static $once (target, event, listener)
    {
        function on ()
        {
            Events.$off(target, event, on)
            listener.apply(target, arguments)
        }
        on.listener = listener

        Events.$on(target, event, on)
    }

    static $off (target, event, listener)
    {
        if (Type.isArray(event))
        {
            for (let i = 0, l = event.length; i < l; i++)
            {
                Events.$off(target, event[i], listener)
            }
            return
        }

        Registry.delete(target, event, listener)
    }

    static $emit (target, event)
    {
        let events = Registry.get(target)

        let cbs = events[event]
        if (cbs)
        {
            cbs = cbs.length > 1 ? Type.toArray(cbs) : cbs
            const args = Type.toArray(arguments, 2)
            for (let i = 0, l = cbs.length; i < l; i++)
            {
                invoke(cbs[i], target, args)
            }
        }
    }
}