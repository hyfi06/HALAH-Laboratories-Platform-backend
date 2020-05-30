const pdfMock = `<!DOCTYPE html>
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
      <div class="field">
  <div class="field-name">
    First name:
  </div>
  <div class="field-value">
    Mayne
  </div>
</div>

<div class="field">
  <div class="field-name">
    Last name:
  </div>
  <div class="field-value">
    Snasel
  </div>
</div>

<div class="field">
  <div class="field-name">
    Contact number:
  </div>
  <div class="field-value">
    624215528148
  </div>
</div>
    </section>
    <section>
      <section class="section-title">
        Results
      </section>
      <hr />
      <div class="test">
  <div class="test-header">
    <div class="test-name">
      1,25-Dihydroxyvitamin D, Serum
    </div>
    <div class="field">
      <div class="field-name">
        Date:
      </div>
      <div class="field-value">
        2020-02-03T08:24:39Z
      </div>
    </div>
    <div class="field">
      <div class="field-name">
        Doctor:
      </div>
      <div class="field-value">
        Cathie Toffaloni
      </div>
    </div>
    <div class="field">
      <div class="field-name">
        Document:
      </div>
      <div class="field-value">
        9228628907
      </div>
    </div>
    <div class="field">
      <div class="field-name">
        Results date:
      </div>
      <div class="field-value">
        2020-02-18T00:18:03Z
      </div>
    </div>
    <div class="field">
      <div class="field-name">
        Bacteriologist:
      </div>
      <div class="field-value">
        Morse Cavendish
      </div>
    </div>
    <div class="field">
      <div class="field-name">
        Document:
      </div>
      <div class="field-value">
        9524930997
      </div>
    </div>
  </div>
  <div class="result">
    <table class="result-table">
      <THEAD>
        <tr>
          <th>Test</th>
          <th>Value</th>
          <th>Reference</th>
        </tr>
      </THEAD>
      <tr class="result-row">
<th class="result-fieldName">
  DVHD
</th>
<td class="result-value">
  30.5
</td>
<td class="result-reference">
  Males:
  <16 years: 24-86 pg/mL
  > or =16 years: 18-64 pg/mL
Females:
  <16 years: 24-86 pg/mL
  > or =16 years: 18-78 pg/mL
</td>
</tr>

    </table>
  </div>
</div>
    </section>
  </body>
</html>`;

class PDFServiceMock {
  async resultsHTMLString(orderIds) {
    return Promise.resolve('<html><body>example</body></html>');
  }
}

module.exports = {
  PDFServiceMock,
  pdfMock,
};