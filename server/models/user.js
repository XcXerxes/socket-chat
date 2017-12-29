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
      allowNull: false,
      validate: {
        len: [3, 15]
      }
    },
    password: {
      type: DataType.STRING(16),
      allowNull: false,
      validate: {
        len: [6, 15]
      }
    },
    confirm_password: {
      type: DataType.STRING(16),
      allowNull: false,
      validate: {
        len: [6, 15]
      }
    },
    email: {
      type: DataType.STRING(32),
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    client_ip: {
      type: DataType.STRING(16),
      allowNull: true
      // validate: {
      //   isIP: true
      // }
    },
    role: {
      type: DataType.STRING(16),
      defaultValue: 'regist',
      allowNull: false
    }
  })
}