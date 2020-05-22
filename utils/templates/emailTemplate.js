const emailTemplate = (data) => {
  const { name, username, passwordSecure } = data;
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body>
      <h1>Hi ${name}!</h1>
      <p>Welcome to our platform HalahLaboratories</p>
      <p>username: ${username}</p>
      <p>password: ${passwordSecure}</p>
  </body>
  </html>
`;
};

module.exports = emailTemplate;
