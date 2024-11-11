export class SpotterErrorResponse extends Response {
  json(): Promise<any> {
    return Promise.resolve({ error: "SpotterErrorResponse" });
  }
}
