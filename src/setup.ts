process.env['NODE_ENV'] ??= 'development';

import { config } from 'dotenv';
import { join } from 'node:path';

import { NODE_ENV } from './node-env';

config({
	path:
		NODE_ENV === 'development'
			? join(process.cwd(), 'test.env')
			: join(process.cwd(), '.env'),
});
