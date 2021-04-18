export function initTmp (B)
{
    if (typeof window !== 'undefined' && typeof window.B === 'function')
    {
        B.extend(window.B)
    }
}