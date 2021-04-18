import Type from '../../libs/type'

export function initUse (B)
{
    B.use = function (plugin)
    {
        const args = Type.toArray(arguments, 1)
        args.unshift(this)
        if (typeof plugin.install === 'function')
        {
            plugin.install.apply(plugin, args)
        }
        else if (typeof plugin === 'function')
        {
            plugin.apply(null, args)
        }
    }
}