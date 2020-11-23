import './internal/b'

export * from './libs'

if (global && global.window && global.window.B)
{
    Object.assign(global.window.B, exports)
}