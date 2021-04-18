import { initExtend } from "./extend"
import { initTmp } from "./tmp"
import { initUse } from "./use"
import Type from "../../libs/type"
import { ready } from "../../libs/events/ready"

function B (node)
{
    if (Type.isNotEmptyString(node))
    {
        return document.getElementById(node)
    }

    if (Type.isDomNode(node))
    {
        return node
    }

    if (Type.isFunction(node))
    {
        return ready(node)
    }

    return null
}

initExtend(B)
initTmp(B)
initUse(B)

export default B