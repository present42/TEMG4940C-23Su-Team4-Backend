const express = require('express');
const app = express();
const port = 3500;

const fs = require('fs');
const { parse } = require('csv-parse')

app.get('/', (req, res) => {
    res.send('This is a TEMG4940C Team 4 Backend API Server');
})

// query information of all companies
app.get('/company', (req, res) => {
    fs.readFile('./data/final_company_info.csv', (err, fileData) => {
        parse(fileData, { columns: true, trim: true }, (err, rows) => {
            res.send(rows);
        })
    });
});

// query company information using company ID
app.get('/company/:companyID', (req, res) => {
    fs.readFile('./data/final_company_info.csv', (err, fileData) => {
        parse(fileData, { columns: true, trim: true }, (err, rows) => {
            result = rows.filter((company) => company.OAPermID === req?.params?.companyID);
            res.send(result);
        })
    });
});

// query lists of bonds issued by a company with company ID
app.get('/company/:companyID/bond', (req, res) => {
    fs.readFile('./data/combined_bonds_data.csv', (err, fileData) => {
        parse(fileData, { columns: true, trim: true }, (err, rows) => {
            result = rows.filter((bond) => bond.PermID === req?.params?.companyID);
            res.send(result);
        })
    });
});

// query bond information using bond ID
app.get('/bond/:bondID', (req, res) => {
    fs.readFile('./data/combined_bonds_data.csv', (err, fileData) => {
        parse(fileData, { columns: true, trim: true }, (err, rows) => {
            result = rows.filter((bond) => bond.BondID === req?.params?.bondID);
            res.send(result);
        })
    });
});

// query bond price history using bond ID
app.get('/bond/price_history/:bondID', (req, res) => {

    fs.readFile('./data/combined_bonds_data.csv', (err, fileData) => {
        parse(fileData, { columns: true, trim: true }, (err, rows) => {
            result = rows.filter((bond) => bond.BondID === req?.params?.bondID);

            if (result.length === 0 || result[0].RIC === "") {
                res.send([]);
            } else {
                const path = `./data/bond_prices/${result[0].RIC}.csv`
                
                if (fs.existsSync(path)) {
                    //file exists
                    fs.readFile(path, (err, histData) => {
                        parse(histData, { columns: true, trim: true }, (err, hist) => {
                            res.send(hist);
                        })
                    })
                } else {
                    res.send([]);
                }
            }
        })
    });
});

app.listen(port, () => {
    console.log(`TEMG4940C Team 4 Backend Server listening on port ${port}`)
});