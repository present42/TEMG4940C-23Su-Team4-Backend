# TEMG4940C Team 4 Backend API Server

This Node.js application provides a RESTful API for querying company and bond information. The application listens on port 3500.

## Installation and Running
To run the application, follow these steps:

1. Install Node.js (https://nodejs.org/en/)
2. Clone the repository to your local machine
3. Clone the `data` directory from [Melvin's TEMG4940C-23Su-Team4](https://github.com/mt1516/TEMG4940C-23Su-Team4) and move it to the root directory of this repository.
4. Navigate to the project directory in the terminal
5. Install the required packages by running the following command: npm install
6. Run the application by running the following command: node index.js
7. The application can now be accessed at http://localhost:3500

## API Endpoints

### GET /
Returns a simple welcome message.

### GET /company
Returns information of all companies in JSON format.

### GET /company/:companyID
Returns information of a specific company with the provided company ID in JSON format.

### GET /company/:companyID/bond
Returns a list of bonds issued by the company with the provided company ID in JSON format.

### GET /bond/:bondID
Returns information of a specific bond with the provided bond ID in JSON format.

### GET /bond/price_history/:bondID
Returns price history of a specific bond with the provided bond ID in CSV format. If the price history does not exist, an empty array is returned.

### GET /macro/corporateIncomeTaxRate/:countryCode
This endpoint returns the corporate income tax rate for a specific country. The :countryCode parameter is a 3-letter country code. The response is a JSON object containing tax rates, where each key represents a year and its corresponding value is the tax rate.

If the specified country code is not found, a 404 error is returned.

### GET /macro/currentAccountBalance/:countryCode
This endpoint returns the current account balance for a specific country. The :countryCode parameter is a 3-letter country code.  The response is a JSON object containing current account balances, where each key represents a quarter and its corresponding value is the current account balance at that quarter.

If the specified country code is not found, a 404 error is returned.

### GET /macro/gdpPerCapita/:countryCode
This endpoint returns the GDP per capita for a specific country. The :countryCode parameter is a 3-letter country code. The response is a JSON object containing the GDP per capita, where each key represents a year and its corresponding value is the GDP per capita.

If the specified country code is not found, a 404 error is returned.

### GET /macro/governmentSpending/:countryCode
This endpoint returns the government spending for a specific country. The :countryCode parameter is a 3-letter country code. The response is a JSON object containing the government spending, where each key represents a year and its corresponding value is the government spending.

If the specified country code is not found, a 404 error is returned.

### GET /macro/shortTermInterestRate/:countryCode
This endpoint returns the short-term interest rate for a specific country. The :countryCode parameter is a 3-letter country code. The response is a JSON object containing the short-term interest rates, where each key represents a month and its corresponding value is the short-term interest rate at that month.

If the specified country code is not found, a 404 error is returned.

### GET /macro/unemploymentRate/:countryCode
This endpoint returns the unemployment rate for a specific country. The :countryCode parameter is a 3-letter country code. The response is a JSON object containing the unemployment rate, where each key represents a month and its corresponding value is the unemployment rate at that month.

If the specified country code is not found, a 404 error is returned.

## Data Sources
The application uses the following CSV files as data sources:

./data/final_company_info.csv: contains information of all companies
./data/combined_bonds_data.csv: contains information of all bonds issued by the companies
./data/bond_prices/[RIC].csv: contains price history of the bonds, where [RIC] is the RIC code of the bond.