class PasswordGenerator {
  constructor() {
    this.ASCII_LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
    this.ASCII_UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.DIGITS = '0123456789';
    this.SYMBOLS = '!"#$%&\'()*+,-./:;?@[]^_`{|}~';
    this.PRINTABLE = [
      ...this.DIGITS.split(''),
      ...this.ASCII_LOWERCASE.split(''),
      ...this.ASCII_UPPERCASE.split(''),
      ...this.SYMBOLS.split(''),
    ];
  }

  /**
   * Generate a security password
   * @param {number} [max=16] max length
   * @param {number} [min=max] min length
   * @returns {string} password
   */
  generate(max = 16, min = max) {
    if (max < min) {
      [max, min] = [min, max];
    }

    if (min < 8) throw new Error('Min length for a security password is 8');

    const passwordLength =
      max - min === 0 ? max : this.randomNumber(max + 1, min);

    const password = new Array(passwordLength);

    password[0] = this.choiceOne(this.ASCII_LOWERCASE);
    password[1] = this.choiceOne(this.ASCII_UPPERCASE);
    password[2] = this.choiceOne(this.DIGITS);
    password[3] = this.choiceOne(this.SYMBOLS);

    for (let i = 4; i <= passwordLength; i += 1) {
      password[i] = this.choiceOne(this.PRINTABLE);
    }
    this.shuffle(password);
    return password.join('');
  }

  /**
   * Shuffle a array.
   * @param {*[]} array array
   * @return {*[]}
   */
  shuffle(array) {
    const rndArray = array
      .map((item) => [Math.random(), item])
      .sort((a, b) => a[0] - b[0]);
    array.forEach((item, i) => (array[i] = rndArray[i][1]));
  }

  /**
   * Choice one of a iterable
   * @param {*} iterable
   * @returns {*} a item of a iterable
   */
  choiceOne(iterable) {
    const index = this.randomNumber(iterable.length);
    return iterable[index];
  }

  /**
   * Generate a random number in a interval
   * @param {number} [max=100] max of interval (exclusive)
   * @param {number} [min=0] min of interval (inclusive)
   * @param {boolean} [isFloat=false] if it is false, return a integer
   * @returns {number} random number
   */
  randomNumber(max = 100, min = 0, isFloat = false) {
    if (max < min) {
      [max, min] = [min, max];
    }
    const rndNumber = min + (max - min) * Math.random();
    return isFloat ? rndNumber : Math.floor(rndNumber);
  }

  /**
   * Test of security password
   * @param {string} str password
   * @returns {boolean}
   */
  isSecurity(str) {
    let security =
      str.length > 8 &&
      this.ASCII_LOWERCASE.split('').filter((char) =>
        str.split('').includes(char)
      ).length > 0 &&
      this.ASCII_UPPERCASE.split('').filter((char) =>
        str.split('').includes(char)
      ).length > 0 &&
      this.DIGITS.split('').filter((char) => str.split('').includes(char))
        .length > 0 &&
      this.SYMBOLS.split('').filter((char) => str.split('').includes(char))
        .length > 0;
    return security;
  }

  /**
   * Generate a random number in a interval and convert a string with a minimal lenght
   * @param {number} [len=4] minimal lenght of final string
   * @param {number} [max=100] max of interval (exclusive)
   * @param {number} [min=0] min of interval (inclusive)
   * @param {boolean} [isFloat=false] if it is false, return a integer
   * @returns {string} random number to string
   */

  randomNumberStr(len = 4, max = 100, min = 0, float = false) {
    let numStr = this.randomNumber(max, min, float).toString();
    while (numStr.length < len) {
      numStr = `0${numStr}`;
    }
    return numStr;
  }
}

module.exports = PasswordGenerator;
