export class GetMyRequestsQuery {
  constructor(
    public readonly username: string,
    public readonly limit: number,
    public readonly offset: number,
  ) {}
}
