const mongoose = require('mongoose')

const conexao = async() => {
    //conexao local
    //var bdlocal = await mongoose.connect('mongodb://localhost/ac1tri')
    //conexao atlas
    var atlas = await mongoose.connect('mongodb+srv://useradmin:eunaosei@fiaptecnico.cga0c.mongodb.net/crud')
}

module.exports = conexao
