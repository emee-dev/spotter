export type SpotterArgs = {
  apikey: string;
  projectId: string;
  maskKeys?: string[];
  ignorePaths?: string[];
  environment?: "development" | "production" | "debug";
  /** Important for inspecting the SDK payload. Set `environment: 'debug'` to use it.
   * - e.g., https://webhook.site/
   */
  debugUrl?: string;
  logLevel?: "verbose" | "silent";
};

export class Spotter {
  private static instance: Spotter;

  private config: Required<
    Omit<SpotterArgs, "maskKeys" | "ignorePaths" | "debugUrl">
  > &
    Partial<SpotterArgs> = {
    apikey: "",
    projectId: "",
    environment: "production",
    logLevel: "silent",
  };

  private constructor() {}

  /**
   * Initializes or updates the Spotter configuration with the provided arguments.
   * This is a singleton, so it will only initialize once.
   * @param args - Configuration arguments.
   */
  public static init(args: SpotterArgs): void {
    if (!Spotter.instance) {
      Spotter.instance = new Spotter();
    }
    Spotter.instance.updateConfig(args);
    // Spotter.instance.log("SDK Initialized.", "verbose");
  }

  /**
   * Updates the Spotter configuration, validating required properties.
   * @param args - Partial configuration arguments to update.
   */
  private updateConfig(args: SpotterArgs): void {
    const requiredKeys: Array<keyof SpotterArgs> = ["apikey", "projectId"];

    requiredKeys.forEach((key) => {
      if (!args[key]) {
        throw new Error(`Missing required config property: ${key}`);
      }
    });

    this.config = { ...this.config, ...args };
  }

  /**
   * Retrieves the current configuration if defined.
   * @returns The Spotter configuration, or null if not initialized.
   */
  public getConfig(): SpotterArgs | null {
    return this.isConfigDefined() ? { ...this.config } : null;
  }

  /**
   * Checks if the required config properties are set.
   * @returns True if configuration is set; otherwise, false.
   */
  public isConfigDefined(): boolean {
    return !!this.config.apikey && !!this.config.projectId;
  }

  /**
   * Returns the single instance of the Spotter class.
   * @returns The Spotter instance.
   */
  public static getInstance(): Spotter {
    if (!Spotter.instance) {
      throw new Error("Spotter is not initialized. Call Spotter.init() first.");
    }
    return Spotter.instance;
  }

  private log(message: string, level: "verbose" | "silent" = "verbose"): void {
    if (this.config.logLevel === "verbose" || level === "silent") {
      console.log(`[Spotter - ${level.toUpperCase()}]: ${message}`);
    }
  }
}
