"use strict"

module.exports = (sequlize, DataType) => {
  return sequlize.define('user', {
    id: {
      type: DataType.UUID,
      primaryKey: true,
      defaultValue: DataType.UUIDV1,
      allowNull: false // 不能为空
    },
    username: {
      type: DataType.STRING(16),
      allowNull: false
    },
    password: {
      type: DataType.STRING(32),
      allowNull: false
    },
    role: {
      type: DataType.STRING(32),
      defaultValue: 'regist',
      allowNull: false
    }
  })
}