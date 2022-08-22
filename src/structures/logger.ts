import { LogLevel } from '../enums';

type ConsoleLogMethods = 'debug' | 'info' | 'warn' | 'error';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
abstract class Logger {
	protected static readonly levels = new Map<LogLevel, ConsoleLogMethods>([
		[LogLevel.Debug, 'debug'],
		[LogLevel.Info, 'info'],
		[LogLevel.Warn, 'warn'],
		[LogLevel.Error, 'error'],
		[LogLevel.Fatal, 'error'],
	]);

	public static debug(...values: readonly unknown[]): void {
		this.print(LogLevel.Debug, ...values);
	}

	public static info(...values: readonly unknown[]): void {
		this.print(LogLevel.Info, ...values);
	}

	public static warn(...values: readonly unknown[]): void {
		this.print(LogLevel.Warn, ...values);
	}

	public static error(...values: readonly unknown[]): void {
		this.print(LogLevel.Error, ...values);
	}

	public static fatal(...values: readonly unknown[]): void {
		this.print(LogLevel.Fatal, ...values);
	}

	protected static print(level: LogLevel, ...values: readonly unknown[]): void {
		const method = this.levels.get(level);

		if (!method) return;

		console[method](
			`[${method.toUpperCase()}](${new Date().toLocaleTimeString()})`,
			...values,
		);
	}
}

export default Logger;
