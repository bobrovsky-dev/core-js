export function initExtend (B)
{
    B.extend = function (target)
    {
        target = target || {}

        let args = Array.prototype.slice.call(arguments),
            length = args.length,
            i = 1

        if (args.length === 1)
        {
            target = this;
            i = 0;
        }

        for (; i < length; i++)
        {
            if (!args[i])
            {
                continue
            }
            for (let key in args[i])
            {
                if (args[i].hasOwnProperty(key))
                {
                    target[key] = args[i][key]
                }
            }
        }

        return target
    }
}