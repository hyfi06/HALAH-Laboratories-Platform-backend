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
  <body style="margin: 0; padding: 0;">
    <table
      style="
        width: 340px;
        height: 530px;
        margin: 0 auto;
        background-color: #00224e;
      "
    >
      <tr>
        <td style="text-align: center;">
          <img
            width="180px"
            height="180px"
            src="https://i.imgur.com/JR05wxd.png"
            alt="Logo of HALAH Laboratories"
          />
        </td>
      </tr>
      <tr>
        <td style="text-align: center;">
          <h1 style="font-family: Geneva; color: #f1f7fe;">
            Welcome ${name}
          </h1>
          <p
            style="
              font-family: 'Source Sans Pro', sans-serif;
              font-size: 18px;
              color: #f1f7fe;
              text-align: justify;
              margin-left: 20px;
            "
          >
            HALAH Laboratories <br />
            thanks you for your preference
          </p>
        </td>
      </tr>
      <tr>
        <td style="text-align: center;">
          <p
            style="
              font-family: 'Source Sans Pro', sans-serif;
              font-size: 20px;
              color: #f1f7fe;
            "
          >
            This are your access data
          </p>
          <p
            style="
              font-family: 'Source Sans Pro', sans-serif;
              font-size: 20px;
              color: #dbdbdbbb;
              text-align: justify;
              margin-left: 20px;
            "
          >
            Username:
            <span style="font-size: 24px; color: #f1f7fe;">${username}</span>
          </p>
          <p
            style="
              font-family: 'Source Sans Pro', sans-serif;
              font-size: 20px;
              color: #dbdbdbbb;
              text-align: justify;
              margin-left: 20px;
            "
          >
            Password:
            <span style="font-size: 24px; color: #f1f7fe;">${passwordSecure}</span>
          </p>
        </td>
      </tr>
      <tr style="margin-bottom: 15px;">
        <td style="text-align: center;">
          <a
            style="
              font-family: Helvetica;
              font-size: 24px;
              text-shadow: 1px 3px #525252;
              color: #f1f7fe;
              text-decoration: none;
            "
            href=""
            >Go to Login</a
          >
        </td>
      </tr>
    </table>
  </body>
</html>


`;
};

module.exports = emailTemplate;
