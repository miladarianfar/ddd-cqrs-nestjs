export class User {
  constructor(
    public readonly id: number,
    private readonly username: string,
    private readonly password: string,
    public readonly createdOn: Date,
    public readonly updatedOn: Date,
  ) {}
}
