let bTmp = window.B

window.B = {}

if (bTmp)
{
    Object.keys(bTmp).forEach(key => {
        window.B[key] = bTmp[key]
    })
}

exports = window.B