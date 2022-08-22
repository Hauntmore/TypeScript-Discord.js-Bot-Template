import type { EventArguments, EventPayload, Events } from '../interfaces';
import type Client from './client';
import type { Awaitable } from 'discord.js';

import { client } from '../main';

type Payload = EventPayload<Events>;

abstract class BaseEvent<EventName extends Events> {
	protected readonly client!: Client<boolean>;

	public readonly name: Payload['name'];

	public readonly description: Payload['description'];

	public readonly once?: Payload['once'] | undefined;

	public readonly rest?: Payload['rest'] | undefined;

	public constructor(public readonly payload: Payload) {
		this.client = client;
		this.name = payload.name;
		this.description = payload.description;
		this.once = payload.once;
		this.rest = payload.rest;
	}

	public abstract run(...args: EventArguments[EventName]): Awaitable<void>;
}

export default BaseEvent;
