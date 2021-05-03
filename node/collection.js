module.exports = function (client) {
    return {
        user: client.db("mydb").collection("user")
    }
}