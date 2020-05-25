const emailTemplate = (data) => {
  const { name, username, passwordSecure } = data;
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>HALAH Form</title>
  </head>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Muli:wght@700&family=Source+Sans+Pro:wght@400;700&display=swap');
    body {
      margin: 0;
      padding: 0;
    }
    main {
      width: 100%;
      height: 530px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #00224e;
    }
    h1 {
      font-family: 'Muli';
      color: #f1f7fe;
      margin: 0 1em;
    }
    p {
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 20px;
      color: #f1f7fe;
    }
    div {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }
    span {
      color: #02c39a;
      font-size: 22px;
    }
    a {
      font-family: 'Muli';
      color: #ff453e;
      text-decoration: none;
    }
  </style>
  <body>
    <main>
      <img
        src="https://i.imgur.com/JR05wxd.png"
        alt="Logo of HALAH Laboratories"
      />
      <h1>Welcome ${name}</h1>
      <p>
        HALAH Laboratories <br />
        Thanks you for your preference
      </p>
      <div>
        <p>This are your access data</p>
        <p>Username: <span>${username}</span></p>
        <p>Password: <span>${passwordSecure}</span></p>
      </div>

      <a href="">Go to login</a>
    </main>
  </body>
</html>
`;
};

module.exports = emailTemplate;
