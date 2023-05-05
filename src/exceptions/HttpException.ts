interface IHttpException {
  id: number;
  message: string;
}

export class HttpException extends Error {
  public status: number;
  public message: string;
  public id: number;

  constructor(status: number, obj: IHttpException) {
    super(obj.message);
    this.status = status;
    this.message = obj.message;
    this.id = obj.id;
  }
}
