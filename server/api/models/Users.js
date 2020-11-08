/**
 * Users.js
 *
 * A user who can log in to this application.
 */

module.exports = {
  tableName: 'users',
  attributes: {
    firstName: {
      columnName: 'first_name',
      type: 'string',
      allowNull: true
    },
    lastName: {
      columnName: 'last_name',
      type: 'string',
      allowNull: true
    },
    gender: {
      columnName: 'gender',
      type: 'number',
      allowNull: true
    },
    password: {
      columnName: 'password',
      type: 'string',
      required: true,
      description: 'Securely hashed representation of the user\'s login password.',
      protect: true,
    },
    email: {
      type: 'string',
      allowNull: true
    },
    active: {
      columnName: 'active',
      type: 'boolean',
      required: true,
    },
  },
};
