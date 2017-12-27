
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
