export default function parseTime(time, cFormat) {
    if (!time || arguments.length === 0) {
        return null
    }

    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        if (typeof (time) === 'string') time = time.replace(/-/g, '/')
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') return ['日', '一', '二', '三', '四', '五', '六'][value]
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return timeStr
}