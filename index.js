const express = require('express');
const app = express();
const port = 3500;

const fs = require('fs');
const { parse } = require('csv-parse')

// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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

app.get('/bond', (req, res) => {
    fs.readFile('./data/backend_combined_bonds_data.csv', (err, fileData) => {
        parse(fileData, { columns: true, trim: true }, (err, rows) => {
            result = rows.filter((bond) => bond.BondID === req?.params?.bondID);

            result = result.map(({ISIN, DebtTypeDescription, FaceIssuedUSD, CouponCurrency, SPRating, SPRatingDate, IssuerOAPermID, SeniorityTypeDescription, SPIssuerRating, ...keepAttrs}) => {
                return keepAttrs
            });

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

// query historic prices of corporate income tax rates with 3 digit country code
app.get('/macro/corporateIncomeTaxRate/:countryCode', (req, res) => {
    fs.readFile('./data/macroeconomic/corporate income tax rate (yearly).csv', (err, fileData) => {
        parse(fileData, { columns: true, trim: true }, (err, rows) => {
            result = rows.filter((taxRates) => taxRates["Country Code"] === req?.params?.countryCode);
            if(result.length === 0) {
                res.sendStatus(404);
                return;
            }
            Object.keys(result[0]).forEach((key, index) => {
                if(result[0][key] == "") result[0][key] = "N/A";
            })
            res.send(result[0]);
        })
    });
});

app.get('/macro/currentAccountBalance/:countryCode', (req, res) => {
    fs.readFile('./data/macroeconomic/current account balance (quarterly).csv', (err, fileData) => {
        parse(fileData, { columns: true, trim: true }, (err, rows) => {
            result = rows.filter((balances) => balances["Country Code"] === req?.params?.countryCode);
            if(result.length === 0) {
                res.sendStatus(404);
                return;
            }
            Object.keys(result[0]).forEach((key, index) => {
                if(result[0][key] == "") result[0][key] = "N/A";
            })
            res.send(result[0]);
        })
    });
});

app.get('/macro/gdpPerCapita/:countryCode', (req, res) => {
    fs.readFile('./data/macroeconomic/gdp per capita (yearly).csv', (err, fileData) => {
        parse(fileData, { columns: true, trim: true }, (err, rows) => {
            result = rows.filter((gdp) => gdp["Country Code"] === req?.params?.countryCode);
            if(result.length === 0) {
                res.sendStatus(404);
                return;
            }
            Object.keys(result[0]).forEach((key, index) => {
                if(result[0][key] == "") result[0][key] = "N/A";
            })
            res.send(result[0]);
        })
    });
});

app.get('/macro/governmentSpending/:countryCode', (req, res) => {
    fs.readFile('./data/macroeconomic/government spending (yearly).csv', (err, fileData) => {
        parse(fileData, { columns: true, trim: true }, (err, rows) => {
            result = rows.filter((spending) => spending["Country Code"] === req?.params?.countryCode);
            if(result.length === 0) {
                res.sendStatus(404);
                return;
            }
            Object.keys(result[0]).forEach((key, index) => {
                if(result[0][key] == "") result[0][key] = "N/A";
            })
            res.send(result[0]);
        })
    });
});

app.get('/macro/shortTermInterestRate/:countryCode', (req, res) => {
    fs.readFile('./data/macroeconomic/short-term (montly).csv', (err, fileData) => {
        parse(fileData, { columns: true, trim: true }, (err, rows) => {
            result = rows.filter((rates) => rates["Country Code"] === req?.params?.countryCode);
            if(result.length === 0) {
                res.sendStatus(404);
                return;
            }
            Object.keys(result[0]).forEach((key, index) => {
                if(result[0][key] == "") result[0][key] = "N/A";
            })
            res.send(result[0]);
        })
    });
});

app.get('/macro/unemploymentRate/:countryCode', (req, res) => {
    fs.readFile('./data/macroeconomic/unemployment rate (monthly).csv', (err, fileData) => {
        parse(fileData, { columns: true, trim: true }, (err, rows) => {
            result = rows.filter((rates) => rates["Country Code"] === req?.params?.countryCode);
            if(result.length === 0) {
                res.sendStatus(404);
                return;
            }
            Object.keys(result[0]).forEach((key, index) => {
                if(result[0][key] == "") result[0][key] = "N/A";
            })
            res.send(result[0]);
        })
    });
});

// get bonds of companies whose headquarters in a specific country
app.get('/credit/bonds/:countryCode', (req, res) => {
    fs.readFile('./data/backend_combined_bonds_data.csv', (err, fileData) => {
        parse(fileData, { columns: true, trim: true }, (err, rows) => {
            result = rows.filter((rates) => rates["Company Headquarter"] === req?.params?.countryCode);
            result = result.map(({ISIN, DebtTypeDescription, FaceIssuedUSD, CouponCurrency, SPRating, SPRatingDate, IssuerOAPermID, SeniorityTypeDescription, SPIssuerRating, ...keepAttrs}) => {
                return keepAttrs
            })

            if(result.length === 0) {
                res.sendStatus(404);
                return;
            }

            res.send(result);
        });
    });
});

app.get('/credit/overall/:countryCode', (req, res) => {
    fs.readFile('./data/backend_combined_bonds_data.csv', (err, fileData) => {
        parse(fileData, { columns: true, trim: true }, (err, rows) => {
            result = rows.filter((rates) => rates["Company Headquarter"] === req?.params?.countryCode);
            result = result.map(({ISIN, DebtTypeDescription, FaceIssuedUSD, CouponCurrency, SPRating, SPRatingDate, IssuerOAPermID, SeniorityTypeDescription, SPIssuerRating, ...keepAttrs}) => {
                return keepAttrs
            })

            if(result.length === 0) {
                res.sendStatus(404);
                return;
            }

            res.send(result);
        });
    });
});

app.listen(port, () => {
    console.log(`TEMG4940C Team 4 Backend Server listening on port ${port}`)
});