//importar o pacote multer
const multer = require('multer')

//configurar o padrao de armazenamento
const armazenamento = multer.diskStorage(
    //pasta de destino
    {
        destination: (req, file, cb) => {
            cb(null, './uploads/')
        },
        //definir o padrão para os nomes dos arquivos
        filename: (req, file, cb) => {
            cb(null, Date.now() + file.originalname)
        }
    }
)

var upload = multer({
    storage: armazenamento,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error("Tipo de arquivo inválido"))
        }
    },
    limits: { fileSize: 100000 }

}).single("imagem")

module.exports = upload