const database = require('../dao/inmem-db')

const userService = {
    create: (user, callback) => {
        database.add(user, (err, data) => {
            if (err) {
                callback(err, null)
            } else {
                callback(null, {
                    message: `User created with id ${data.id}.`,
                    data: data
                })
            }
        })
    },

    getAll: (callback) => {
        database.getAll((err, data) => {
            if (err) {
                callback(err, null)
            } else {
                console.log(data)
                callback(null, {
                    message: `Found ${data.length} users.`,
                    data: data
                })
            }
        })
    },

    getById: (userId, callback) => {
        database.getById(userId, (err, user) => {
            if (err) {
                callback(err, null)
            } else {
                if (!user) {
                    callback(
                        {
                            status: 404,
                            message: `User with id ${userId} not found.`
                        },
                        null
                    )
                } else {
                    callback(null, user)
                }
            }
        })
    }

    //     delete: (userId, callback) => {
    //         database.getById(userId, (err, user) => {
    //             if (err) {
    //                 callback(err, null)
    //             } else {
    //                 if (!user) {
    //                     callback(
    //                         {
    //                             status: 404,
    //                             message: `User with id ${userId} not found.`
    //                         },
    //                         null
    //                     )
    //                 } else {
    //                     // Nu kunnen we het te verwijderen gebruikersobject doorgeven aan database.delete
    //                     database.delete(user, (err, deletedUser) => {
    //                         if (err) {
    //                             callback(err, null)
    //                         } else {
    //                             callback(null, {
    //                                 status: 200, // HTTP-statuscode voor succesvolle verwijdering
    //                                 message: `User with id ${userId} deleted successfully.`,
    //                                 data: deletedUser
    //                             })
    //                         }
    //                     })
    //                 }
    //             }
    //         })
    //     }
    // }
}
module.exports = userService
