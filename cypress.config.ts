const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
import * as XLSX from 'xlsx';
import { writeFileSync } from 'fs';
import * as path from 'path';
import { any } from 'cypress/types/bluebird';

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on:any, config:any) {
      on('task',{
        convertXlsxToJson(xlsxPath:string){

          const workbook = XLSX.readFile(xlsxPath) //Read File from the provided path (path from test case)
          const worksheet = workbook.Sheets[workbook.SheetNames[0]] //take this and get the first sheet Inside the file
          const jsonData =XLSX.utils.sheet_to_json(worksheet); //Convert this sheet (first tab) to Json file
          const fileName = path.basename(xlsxPath,'.xlsx') //Provide the name of the json file from the downloaded Excel file
          const jsonFilePath = `cypress/fixtures/${fileName}.json` //Provide the path for the json file
          writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 1)) //Write the Json file on provided path and convert JS object to Json String (1 is number of sheets)
          return null
        }
      })
      // implement node event listeners here
      allureWriter(on, config);
      return config;
    },
    execTimeout: 1200000,
    env: {
      allureReuseAfterSpec: true,
      download_dir: "./cypress/downloads",
    },
    "retries":{
      "runMode":1,
      "openMode":1
    },
    allure:true,
    allureResultsPath: "allure-results",
    videosFolder: "allure-results/",
    screenshotOnRunFailure: true,
  },
});
