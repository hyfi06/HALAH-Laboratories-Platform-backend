module.exports = (patient) => `<div class="field">
  <div class="field-name">
    First name:
  </div>
  <div class="field-value">
    ${patient.firstName}
  </div>
</div>

<div class="field">
  <div class="field-name">
    Last name:
  </div>
  <div class="field-value">
    ${patient.lastName}
  </div>
</div>

<div class="field">
  <div class="field-name">
    Contact number:
  </div>
  <div class="field-value">
    ${patient.contactNumber}
  </div>
</div>`;
