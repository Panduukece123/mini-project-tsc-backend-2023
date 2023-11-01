let dataBuku = require("./dataBuku.js");

function addNewBook(req, res){
    const {nama, pengarang, penerbit, tahunTerbit} = req.body;
    if(!nama || !pengarang || !penerbit || !tahunTerbit){
        res.status(400).send("Gagal menambahkan buku. Mohon lengkapi data!");
        return res;
    }

    dataBuku[0].jumlahBuku++;
    const idBuku = "000" + jumlahBuku;
    const bukuBaru = {id, nama, pengarang, penerbit, tahunTerbit};
    dataBuku.push(bukuBaru);

    res.status(201).send({
        "status": "success",
        "message": "Buku berhasil ditambahkan",
        "data": {
            "bookId": Id
        }
    });
    return res;
}

function showAllBooks(req, res){
    res.send(dataBuku);
}

module.import = {addNewBook, showAllBooks};
