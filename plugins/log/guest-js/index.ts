import { invoke } from "@tauri-apps/api/tauri";
import { listen, type UnlistenFn, type Event } from "@tauri-apps/api/event";

export type LogOptions = {
  file?: string;
  line?: number;
  keyValues?: Record<string, string | undefined>;
};

enum LogLevel {
  /**
   * The "trace" level.
   *
   * Designates very low priority, often extremely verbose, information.
   */
  Trace = 1,
  /**
   * The "debug" level.
   *
   * Designates lower priority information.
   */
  Debug,
  /**
   * The "info" level.
   *
   * Designates useful information.
   */
  Info,
  /**
   * The "warn" level.
   *
   * Designates hazardous situations.
   */
  Warn,
  /**
   * The "error" level.
   *
   * Designates very serious errors.
   */
  Error,
}

async function log(
  level: LogLevel,
  message: string,
  options?: LogOptions,
): Promise<void> {
  const traces = new Error().stack?.split("\n").map((line) => line.split("@"));

  const filtered = traces?.filter(([name, location]) => {
    return name.length > 0 && location !== "[native code]";
  });

  const { file, line, keyValues } = options ?? {};

  let location = filtered?.[0]?.filter((v) => v.length > 0).join("@");
  if (location === "Error") {
    location = "webview::unknown";
  }

  await invoke("plugin:log|log", {
    level,
    message,
    location,
    file,
    line,
    keyValues,
  });
}

/**
 * Logs a message at the error level.
 *
 * @param message
 *
 * # Examples
 *
 * ```js
 * import { error } from 'tauri-plugin-log-api';
 *
 * const err_info = "No connection";
 * const port = 22;
 *
 * error(`Error: ${err_info} on port ${port}`);
 * ```
 */
export async function error(
  message: string,
  options?: LogOptions,
): Promise<void> {
  await log(LogLevel.Error, message, options);
}

/**
 * Logs a message at the warn level.
 *
 * @param message
 *
 * # Examples
 *
 * ```js
 * import { warn } from 'tauri-plugin-log-api';
 *
 * const warn_description = "Invalid Input";
 *
 * warn(`Warning! {warn_description}!`);
 * ```
 */
export async function warn(
  message: string,
  options?: LogOptions,
): Promise<void> {
  await log(LogLevel.Warn, message, options);
}

/**
 * Logs a message at the info level.
 *
 * @param message
 *
 * # Examples
 *
 * ```js
 * import { info } from 'tauri-plugin-log-api';
 *
 * const conn_info = { port: 40, speed: 3.20 };
 *
 * info(`Connected to port {conn_info.port} at {conn_info.speed} Mb/s`);
 * ```
 */
export async function info(
  message: string,
  options?: LogOptions,
): Promise<void> {
  await log(LogLevel.Info, message, options);
}

/**
 * Logs a message at the debug level.
 *
 * @param message
 *
 * # Examples
 *
 * ```js
 * import { debug } from 'tauri-plugin-log-api';
 *
 * const pos = { x: 3.234, y: -1.223 };
 *
 * debug(`New position: x: {pos.x}, y: {pos.y}`);
 * ```
 */
export async function debug(
  message: string,
  options?: LogOptions,
): Promise<void> {
  await log(LogLevel.Debug, message, options);
}

/**
 * Logs a message at the trace level.
 *
 * @param message
 *
 * # Examples
 *
 * ```js
 * import { trace } from 'tauri-plugin-log-api';
 *
 * let pos = { x: 3.234, y: -1.223 };
 *
 * trace(`Position is: x: {pos.x}, y: {pos.y}`);
 * ```
 */
export async function trace(
  message: string,
  options?: LogOptions,
): Promise<void> {
  await log(LogLevel.Trace, message, options);
}

interface RecordPayload {
  level: LogLevel;
  message: string;
}

type LoggerFn = (fn: RecordPayload) => void;

/**
 * Attaches a listener for the log, and calls the passed function for each log entry.
 * @param fn
 *
 * @returns a function to cancel the listener.
 */
export async function attachLogger(fn: LoggerFn): Promise<UnlistenFn> {
  return await listen("log://log", (event: Event<RecordPayload>) => {
    const { level } = event.payload;
    let { message } = event.payload;

    // Strip ANSI escape codes
    message = message.replace(
      // TODO: Investigate security/detect-unsafe-regex
      // eslint-disable-next-line no-control-regex
      /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
      "",
    );
    fn({ message, level });
  });
}

/**
 * Attaches a listener that writes log entries to the console as they come in.
 *
 * @returns a function to cancel the listener.
 */
export async function attachConsole(): Promise<UnlistenFn> {
  return attachLogger(({ level, message }: RecordPayload) => {
    switch (level) {
      case LogLevel.Trace:
        console.log(message);
        break;
      case LogLevel.Debug:
        console.debug(message);
        break;
      case LogLevel.Info:
        console.info(message);
        break;
      case LogLevel.Warn:
        console.warn(message);
        break;
      case LogLevel.Error:
        console.error(message);
        break;
      default:
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`unknown log level ${level}`);
    }
  });
}
