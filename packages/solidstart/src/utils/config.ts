type ProjectArgs = {
  apikey: string;
  projectId: string;
};

export class Spotter {
  private static instance: Spotter;
  private apiKey: string | null = null;
  private projectId: string | null = null;

  private constructor() {}

  // Static method to initialize or update the config data
  public static withSpotterConfig(args: ProjectArgs): void {
    if (!Spotter.instance) {
      Spotter.instance = new Spotter();
    }
    Spotter.instance.apiKey = args.apikey;
    Spotter.instance.projectId = args.projectId;
  }

  public getConfig(): ProjectArgs | null {
    if (!this.apiKey || !this.projectId) return null;
    return { apikey: this.apiKey, projectId: this.projectId };
  }

  public isConfigDefined(): boolean {
    return this.apiKey !== null && this.projectId !== null;
  }

  public static getInstance(): Spotter {
    if (!Spotter.instance) {
      Spotter.instance = new Spotter();
    }
    return Spotter.instance;
  }
}
