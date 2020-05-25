module.exports = ({
  examName,
  date,
  doctor,
  resultDate,
  bacteriologist,
  testRows,
}) => `<div class="test">
  <div class="test-header">
    <div class="test-name">
      ${examName}
    </div>
    <div class="field">
      <div class="field-name">
        Date:
      </div>
      <div class="field-value">
        ${date}
      </div>
    </div>
    <div class="field">
      <div class="field-name">
        Doctor:
      </div>
      <div class="field-value">
        ${doctor.firstName} ${doctor.lastName}
      </div>
    </div>
    <div class="field">
      <div class="field-name">
        Document:
      </div>
      <div class="field-value">
        ${doctor.document}
      </div>
    </div>
    <div class="field">
      <div class="field-name">
        Results date:
      </div>
      <div class="field-value">
        ${resultDate}
      </div>
    </div>
    <div class="field">
      <div class="field-name">
        Bacteriologist:
      </div>
      <div class="field-value">
        ${bacteriologist.firstName} ${bacteriologist.lastName}
      </div>
    </div>
    <div class="field">
      <div class="field-name">
        Document:
      </div>
      <div class="field-value">
        ${bacteriologist.document}
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
      ${testRows}
    </table>
  </div>
</div>`;