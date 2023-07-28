# TEMG4940C Team 4 Backend API Server

This Node.js application provides a RESTful API for querying company and bond information. The application listens on port 3500.

## Installation and Running
To run the application, follow these steps:

1. Install Node.js (https://nodejs.org/en/)
2. Clone the repository to your local machine
3. Navigate to the project directory in the terminal
4. Install the required packages by running the following command: npm install
5. Run the application by running the following command: node index.js
6. The application can now be accessed at http://localhost:3500

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

## Data Sources
The application uses the following CSV files as data sources:

./data/final_company_info.csv: contains information of all companies
./data/combined_bonds_data.csv: contains information of all bonds issued by the companies
./data/bond_prices/[RIC].csv: contains price history of the bonds, where [RIC] is the RIC code of the bond.