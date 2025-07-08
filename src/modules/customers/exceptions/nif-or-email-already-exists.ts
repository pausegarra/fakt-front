export class NifOrEmailAlreadyExists extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NifOrEmailAlreadyExists";
  }
}