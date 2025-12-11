# API Tests

A JavaScript-based API testing framework using Playwright and Allure reporting.

## Project Structure

```
API_JS/
├── tests/
│   └── api.spec.js              # API test cases
├── helpers/
│   └── apiClient.js             # API client helper utilities
├── allure-results/              # Allure test results (generated)
├── test-results/                # Playwright test results (generated)
├── package.json                 # Project dependencies and scripts
├── playwright.config.js         # Playwright configuration
├── eslint.config.js             # ESLint configuration
├── jsconfig.json                # JavaScript configuration
└── README.md                    # This file
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables (if needed):
   Create a `.env` file in the root directory with any required environment variables.

## Running Tests

### Run all tests
```bash
npm test
```
This command will:
- Clean previous test results
- Execute tests using Playwright
- Generate and open an Allure report

### Run tests without report
```bash
npm run playwright
```

### Generate Allure report
```bash
npm run report
```

## Code Quality

### Lint code
```bash
npm run lint
```
Fixes ESLint issues.

### Format code
```bash
npm run lint:write
```
Runs ESLint fixes and formats code with Prettier.

## Test Cases

The test suite includes the following API tests:

### GET Requests
- **GET all products** - Retrieves a list of all products and verifies it returns a 200 status and a valid array
- **GET single product by ID** - Retrieves a specific product by ID, verifies 200 status, and checks for required properties (id, name, data)
- **GET products by IDs** - Retrieves multiple products (IDs: 5, 7, 10) and verifies all 3 products are returned with correct IDs

### POST Requests
- **Add new product** - Creates a new product with name and detailed data (year, price, CPU model, hard disk size), verifies 200 status, and validates all fields including the createdAt timestamp

### PUT Requests
- **Update product by ID** - Creates a test product, then performs a full update changing name, year, price, CPU model, hard disk size, and adding a color field, verifies 200 status and all updated values including updatedAt timestamp

### PATCH Requests
- **Partially update product by ID** - Creates a test product, then performs a partial update (changing only the name while preserving original data), verifies 200 status and validates that partial data remains unchanged

### DELETE Requests
- **Delete product by ID** - Creates a test product, deletes it, verifies 200 status on deletion, and confirms deletion by checking that subsequent GET request returns 404

## Technologies

- **Playwright** - End-to-end testing framework
- **Allure** - Test reporting tool
- **Axios** - HTTP client for API requests
- **AJV** - JSON schema validator
- **ESLint** - Code linting
- **Prettier** - Code formatting

## Author

Vano
