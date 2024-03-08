class ErrorReponse extends Error {
  constructor(message, codeStatus) {
    super(message);
    this.codeStatus = codeStatus;
  }
}

module.exports = ErrorReponse;
