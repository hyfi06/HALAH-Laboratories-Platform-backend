const examsMock = [
  {
    name: '1,25-Dihydroxyvitamin D, Serum',
    shortName: 'DHVD',
    description: 'As a second-order test in the assessment of vitamin D status, especially in patients with renal disease Investigation of some patients with clinical evidence of vitamin D deficiency (eg, vitamin D-dependent rickets due to hereditary deficiency of renal 1-alpha hydroxylase or end-organ resistance to 1,25-dihydroxyvitamin D) Differential diagnosis of hypercalcemia',
    indications: 'Fasting (4-hour preferred but not required)',
    resultTemplate: [
      {
        fieldName: 'DVHD',
        reference: `Males:
  <16 years: 24-86 pg/mL
  > or =16 years: 18-64 pg/mL
Females:
  <16 years: 24-86 pg/mL
  > or =16 years: 18-78 pg/mL`,
      },
    ],
    scheduledDays: 1,
    resultWaitingDays: 2,
  },
  {
    name: '1,3-Beta-D-Glucan (Fungitell), Serum',
    shortName: 'SFUNG',
    description: 'Aiding in the diagnosis of invasive fungal infections caused by various fungi, including Aspergillus species, Fusarium species, Candida species, and Pneumocystis jiroveccii, among others',
    indications: 'None',
    resultTemplate: [
      {
        fieldName: 'BDG',
        reference: '<60 pg/mL',
      },
    ],
    scheduledDays: 1,
    resultWaitingDays: 1,
  },
  {
    name: 'Fatty Acid Profile, Mitochondrial (C8-C18), Serum',
    shortName: 'FAPM',
    description: 'Biochemical diagnosis of inborn errors of mitochondrial fatty acid oxidation, including deficiencies of medium-chain acyl-Co-A dehydrogenase, long-chain 3-hydroxyacyl-Co-A dehydrogenase, very long-chain acyl-Co-A dehydrogenase, and glutaricacidemia type 2',
    indications: `1. Patient should fast overnight (12-14 hours).
2. Patient must not consume any alcohol for 24 hours before the specimen is drawn.`,
    resultTemplate: [
      {
        fieldName: 'Octanoic Acid, C8:0',
        reference: `<1 year: 7-63 nmol/mL
1-17 years: 9-41 nmol/mL
> or =18 years: 8-47 nmol/mL`,
      },
      {
        fieldName: 'Decenoic Acid, C10:1',
        reference: `<1 year: 0.8-4.8 nmol/mL
1-17 years: 1.6-6.6 nmol/mL
> or =18 years: 1.8-5.0 nmol/mL`,
      },
      {
        fieldName: 'Decanoic Acid, C10:0',
        reference: `<1 year: 2-62 nmol/mL
1-17 years: 3-25 nmol/mL
> or =18 years: 2-18 nmol/mL`,
      },
      {
        fieldName: 'Lauroleic Acid, C12:1',
        reference: `<1 year: 0.6-4.8 nmol/mL
1-17 years: 1.3-5.8 nmol/mL
> or =18 years: 1.4-6.6 nmol/mL`,
      },
      {
        fieldName: 'Lauric Acid, C12:0',
        reference: `<1 year: 6-190 nmol/mL
1-17 years: 5-80 nmol/mL
> or =18 years: 6-90 nmol/mL`,
      },
      {
        fieldName: 'Tetradecadienoic Acid, C14:2',
        reference: `<1 year: 0.3-6.5 nmol/mL
1-17 years: 0.2-5.8 nmol/mL
> or =18 years: 0.8-5.0 nmol/mL`,
      },
      {
        fieldName: 'Myristoleic Acid, C14:1',
        reference: `<1 year: 1-46 nmol/mL
1-17 years: 1-31 nmol/mL
> or =18 years: 3-64 nmol/mL`,
      },
      {
        fieldName: 'Myristic Acid, C14:0',
        reference: `<1 year: 30-320 nmol/mL
1-17 years: 40-290 nmol/mL
> or =18 years: 30-450 nmol/mL`,
      },
      {
        fieldName: 'Hexadecadienoic Acid, C16:2',
        reference: `<1 year: 4-27 nmol/mL
1-17 years: 3-29 nmol/mL
> or =18 years: 10-48 nmol/mL`,
      },
      {
        fieldName: 'Palmitoleic Acid, C16:1w7',
        reference: `<1 year: 20-1,020 nmol/mL
1-17 years: 100-670 nmol/mL
> or =18 years: 110-1,130 nmol/mL`,
      },
      {
        fieldName: 'Palmitic Acid, C16:0',
        reference: `<1 year: 720-3,120 nmol/mL
1-17 years: 960-3,460 nmol/mL
> or =18 years: 1,480-3,730 nmol/mL`,
      },
      {
        fieldName: 'Linoleic Acid, C18:2w6',
        reference: `< or =31 days: 350-2,660 nmol/mL
32 days-11 months: 1,000-3,300 nmol/mL
1-17 years: 1,600-3,500 nmol/mL
> or =18 years: 2,270-3,850 nmol/mL`,
      },
      {
        fieldName: 'Oleic Acid, C18:1w9',
        reference: `<1 year: 250-3,500 nmol/mL
1-17 years: 350-3,500 nmol/mL
> or =18 years: 650-3,500 nmol/mL`,
      },
      {
        fieldName: 'Stearic Acid, C18:0',
        reference: `<1 year: 270-1,140 nmol/mL
1-17 years: 280-1,170 nmol/mL
> or =18 years: 590-1,170 nmol/mL`,
      },
    ],
    scheduledDays: 2,
    resultWaitingDays: 1,
  },
];

module.exports = examsMock;