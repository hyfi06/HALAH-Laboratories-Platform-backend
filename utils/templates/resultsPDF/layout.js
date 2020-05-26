module.exports = (patientHTML, resultsHTML) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Results</title>
  </head>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Muli:wght@700&family=Source+Sans+Pro:wght@400;700&display=swap');

    * {
      margin: 0px;
    }
    @page {
      margin: 0;
    }
    body {
      padding: 20px;
      font-size: 15px;
      font-family: 'Source Sans Pro', sans-serif;
      color: #001736;
      opacity: 100%;
    }
    body:before {
      content: url('https://hyfi06.s3.us-east-2.amazonaws.com/halahlaboratories/background.svg'); 
      background-color: #f1f7fe;
      fill: aliceblue;
      z-index: -1;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    header {
      font-family: 'Muli', sans-serif;
      font-size: 35px;
      display: flex;
      align-content: center;
    }

    .logo {
      width: 45px;
      height: 45px;
      margin-right: 15px;
      fill: #ffffff;
    }
    .section-title {
      margin: 15px 0 5px 5px;
      font-family: 'Muli', sans-serif;
      font-size: 30px;
    }
    .field {
      display: flex;
      margin: 0 0 0 20px;
    }
    .field-name {
      margin: 0 5px 0 0;
      font-weight: bold;
    }
    .test {
      margin: 15px 10px 0px 0px;
    }
    .test-header {
      page-break-inside: avoid;
    }
    .test-name {
      font-family: 'Muli', sans-serif;
      font-size: 20px;
      margin: 0px 0px 5px 15px;
    }
    .result {
      margin: 0 0 0 20px;
    }
    .result-table {
      width: 100%;
      padding: 0 20px;
    }
    thead {display: table-header-group;}
    .result-row {
      page-break-inside: avoid;
    }
    .result-value {
      text-align: center;
    }
    .result-reference {
      text-align: right;
      white-space: pre-wrap;
    }
  </style>
  <header>
    <img class="logo" src="https://hyfi06.s3.us-east-2.amazonaws.com/halahlaboratories/logo.svg" alt="logo" />
    <strong>HALAH Laboratories</strong>
  </header>
  <body>
    <section>
      <div class="section-title">
        Patient
      </div>
      <hr />
      ${patientHTML}
    </section>
    <section>
      <section class="section-title">
        Results
      </section>
      <hr />
      ${resultsHTML}
    </section>
  </body>
</html>`;
