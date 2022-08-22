import type { ClientEvents, RestEvents } from 'discord.js';

type Events = keyof ClientEvents | keyof RestEvents;

type EventArguments = {
	[Name in Events]: Name extends keyof ClientEvents
		? ClientEvents[Name]
		: Name extends keyof RestEvents
		? RestEvents[Name]
		: never;
};

interface EventPayload<EventName extends Events> {
	readonly name: EventName;
	readonly description: string;
	readonly once?: boolean | undefined;
	readonly rest?: boolean | undefined;
}

export { Events, EventArguments, EventPayload };
