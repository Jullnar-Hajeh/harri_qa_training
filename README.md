# Task5 – User Management Automation Tests

This project contains automated tests for the User Management feature using CodeceptJS and Allure reporting.

---

## How to Run the Tests

1. Open the project folder in PowerShell:
cd "C:\Users\harri_projects\task5"

2. Install dependencies:
npm install

3. Run the tests with step-by-step output:
npx codeceptjs run --steps

---

## How to Generate the Allure Report

After running the tests, generate the Allure report with:
npx allure generate output --clean

The report will be generated in the folder:
allure-report

---

## How to Open the Allure Report

To open the report in your browser:
npx allure open
