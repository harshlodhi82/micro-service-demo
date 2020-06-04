let {users}=  require("../models/users")
let {comments}=  require("../models/comments")

exports.getUserById = (id)=>{
    let user  = users.find(e => e.id === id)
    return user
}

exports.getAllUser = ()=>{
    return users
}

exports.getComments = ()=>{
    let _c = comments.map(e=>{
        let user = this.getUserById(e.userId)
        e.user = user
        return e
    })
    return _c
}