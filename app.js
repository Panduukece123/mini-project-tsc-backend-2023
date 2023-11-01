//Mengimpor dan menggunakan express
const express = require('express');
let dataBuku = require('./dataBuku.js');
const app = express();

const {nanoid} = require('nanoid');

//menggunakan body-parser untuk mengakses data payload
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

function addNewBook(req, res){
    const {nama, pengarang, penerbit, tahunTerbit} = req.body;
    if(!nama || !pengarang || !penerbit || !tahunTerbit){
        res.status(400).send("Gagal menambahkan buku. Mohon lengkapi data!");
        return res;
    }

    let id, index;
    //cek apakah id tersebut sudah ada
    do{
        id = nanoid(10);
        index = dataBuku.findIndex(book => book.id == id);
    }while(index !== -1);

    const bukuBaru = {id, nama, pengarang, penerbit, tahunTerbit};
    dataBuku.push(bukuBaru);

    res.status(201).send({
        "status": "success",
        "message": "Buku berhasil ditambahkan",
        "data": {
            "id": id 
        }
    });
}

function showAllBooks(req, res){
    res.status(200).send({
        "status": "success",
        "books": dataBuku
    });
}

function editBook(req, res){
    const {id} = req.params;
    const {nama, pengarang, penerbit, tahunTerbit} = req.body;

    const index = dataBuku.findIndex(book => book.id == id);
    if(index === -1){
        res.status(404).send({
            "status": "fail",
            "message": "Gagal memperbarui buku. Id tidak ditemukan"
        });
    } else {
        dataBuku[index] ={
            ...dataBuku[index],
            nama,
            pengarang,
            penerbit,
            tahunTerbit
        };

        res.status(200).send({
            "status":  "success",
            "message": "Buku berhasil diperbarui"
        });
    }
}

function deleteBook(req, res){
    const {id} = req.params;
    const index = dataBuku.findIndex(book => book.id === id);

    if(index !== -1){
        dataBuku.splice(index, 1);
        res.status(200).send({
            "status": "success",
            "message": "Buku berhasil dihapus"
        });
    } else{
        res.status(404).send({
            "status": "fail",
            "message": "Buku gagal dihapus. Id tidak ditemukan"
        });
    }
}

//ROUTING
//routing menambahkan data buku baru
app.post('/books', addNewBook);

//routing menampilkan seluruh data buku
app.get('/books', showAllBooks);

//routing mengedit data buku
app.put('/books/:id', editBook);

//routing menghapus data buku dengan id
app.delete('/books/:id', deleteBook);


const port = 3000;
app.listen(port, () => {
    console.log(`Server di jalankan di http://localhost:${port}`);
})
