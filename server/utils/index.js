
/**
 * 分页查询字段处理
 * @param {*分页的条数} param0 
 * @param {*分页的页数} param1 
 * @param {*分页的排序} param2 
 */
exports.parseQueryString = ({limit, page, sort}) => {
    const sort_name = sort && sort.split('-')[0] || 'id'
    const sort_type = sort && sort.split('-')[1] || 'desc'
    limit = +limit || 10
    page = +page || 1
    const offset = (page - 1) * limit
    return {
        limit,
        offset,
        order: [
            [sort_name, sort_type]
        ]
    }
}

const getColorArray = () => {
    return ['avatar-red', 'avatar-pink', 'avatar-purple', 'avatar-deep-purple',
        'avatar-indigo', 'avatar-blue', 'light-blue', 'avatar-cyan', 'avatar-teal', 'avatar-green'
    ]
}
exports.randomColor = () => {
const array = getColorArray()
if (array.length > 0) {
    return array[Math.floor(Math.random() * (array.length - 1 + 0 + 1))]
}
return ''
}
  