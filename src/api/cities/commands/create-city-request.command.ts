export class CreateCityRequestCommand {
  constructor(
    public readonly postCode: string,
    public readonly username: string,
  ) {}
}
