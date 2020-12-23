import './internal/b'

import Type from './lib/type'
import Browser from './lib/browser'
import Text from './lib/text'
import Arrays from './lib/arrays'
import Unicode from './lib/unicode'

export {
    Type,
    Browser,
    Text,
    Arrays,
    Unicode,
}

export * from './libs'

if (global && global.window && global.window.B)
{
    Object.assign(global.window.B, exports)
}