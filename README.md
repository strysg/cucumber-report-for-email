# Pipeline email report generator

From a `cucumber-report.json` file, generates an HTML report that can be sent by email to report results in a compact manner reporting the **failed** test cases.

- Uses report file `resources/pipeline_email_results.ejs` as **ejs** template to send the report (this can be customized)
- Generates HTML `email_report.html`
- Can send email using SMTP credentials located at `configs.local.json` (create a file from `configs.example.json` example:
- Searches for special tags (if they exists) in every test scenario and adds to the report table:
  - `@productBug<ID>`: Used to identify a product Bug
  - `@documentationBug<ID>`: Used to identify a documentation Bug
  - `@closed<ID>`: Used when a bug with specific ID is closed
  
## Setup 

In order to use this in a service it is needed:

1. Install dependencies with `npm install`
2. Create a `configs.local.json` file using contents of `configs.example.json`.
3. Copy a `cucumber-report.json` file from a previous execution of cucumber test cases to this directory.

```json
  // example commented (all this variables can be overriden in pipeline variables)
  "emailReport": {
    "title": "Titan Continuous Testing",
    "dashboardUrl": "https://dev.azure.com/<SOMORG>/_build/results?buildId=<BUILD_ID>",  // optional
    "pipelineUrl": "",         // this is used in the report
    "pipelineExecNumber": "",  // this is obtained from pipeline
    "bugsBaseUrl": "",         // when not using azure api this is used to form bugs urls
    "smtp": {
      "sendEmail": true,       // set to false to avoid sending email.
      "user": "automation-tester@gmail.com",
      "password": "somePasw00rd!",
      "hostUrl": "smtp.gmail.com",
      "port": "587",
      "service": "gmail",
      "from": "automation-tester@gmail.com",
      "to": "someone1@linq.com, someone2@linq.com"
    }
  }
```
4. run `npm run report`. This will generate a `email_report.html` file, and if configured in configs.local.json file will send an email using the smpt credentials.

LICENSE: MIT
