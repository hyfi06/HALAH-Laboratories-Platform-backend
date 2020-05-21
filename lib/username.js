class UsernameBuilder {
  textClean(text) {
    return text
      .split(' ')[0]
      .replace(/Á/gi, 'a')
      .replace(/É/gi, 'e')
      .replace(/Í/gi, 'i')
      .replace(/Ó/gi, 'o')
      .replace(/Ú/gi, 'u')
      .replace(/À/gi, 'a')
      .replace(/È/gi, 'e')
      .replace(/Ì/gi, 'i')
      .replace(/Ò/gi, 'o')
      .replace(/Ù/gi, 'u')
      .replace(/ñ/gi, 'n')
      .replace(/\?/gi, '')
      .replace(/¿/gi, '')
      .replace(/!/gi, '')
      .replace(/¡/gi, '')
      .replace(/ /g, '-')
      .toLowerCase()
      .substr(0, 39);
  }

  build(firstName, lastName, documentID) {
    const firstNameClean = this.textClean(firstName);
    const lastNameClean = this.textClean(lastName);
    const documentLast = documentID.toString().slice(-4);
    return `${firstNameClean}.${lastNameClean}.${documentLast}`;
  }
}

module.exports = UsernameBuilder;
