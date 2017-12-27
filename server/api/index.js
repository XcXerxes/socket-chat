const assertError = require('../utils/assert')
const utils = require('../utils')

/**
 * 通用的查找所有 all
 * @param {*request} req 
 * @param {*response} res 
 * @param {*当前数据表的orm对象} db 
 */
exports.all = (req, res, db) => {
    db.findAll().then(result => {
        return res.json({
            code: 200,
            message: 'success',
            data: result
        })
    }).catch(err => {
        return res.json(assertError(err.toString))
    })
}

/**
 * 通用的分页查询数据
 * @param {*request} req 
 * @param {*response} res 
 * @param {*当前数据表的orm对象} db 
 */
exports.list = (req, res, db) => {
    const params = utils.parseQueryString(req.query)
    db.findAndCountAll(params).then(result => {
        console.log(result)
        return res.json({
            code: 200,
            message: 'success',
            data: result.rows,
            total: result.count
        })
    }).catch(err => {
        return res.json(assertError(err.toString))
    })
}

/**
 * 通用的根据id查询单个
 * @param {*request} req 
 * @param {*response} res 
 * @param {*当前数据表的orm对象} db 
 */
exports.itemById = (req, res, db) => {
    const id = req.query.id || req.params.id || req.body.id
    if (!id) {
        return res.json(assertError('参数错误(id is undefined!)'))
    }
    db.findById(id).then(result => {
        return res.json({
            code: 200,
            message: 'success',
            data: result
        })
    }).catch(err => {
        return res.json(assertError(err.toString))
    })
}

/**
 * 通用查询单个，不是id的
 * @param {*requset} req 
 * @param {*response} res 
 * @param {*当前数据表的orm对象}} db 
 */
exports.item = (req, res, db) => {
    const params = req.query
    if (!params) {
        return res.json(assertError('参数错误(is undefined!)'))
    }
    db.findOne({
        where: params
    }).then(result => {
        return res.json({
            code: 200,
            message: 'success',
            data: result
        })
    }).catch(err => {
        return res.json(assertError(err.toString))
    })
}