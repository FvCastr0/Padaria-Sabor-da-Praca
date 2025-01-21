export class AlreadyExist extends Error {
  constructor(somethingThatAlreadyExists: string) {
    super(`${somethingThatAlreadyExists} já existe.`);
  }
}
