process.env['NODE_ENV'] ??= 'development';

import { config } from 'dotenv';
import { join } from 'node:path';

// import { NODE_ENV } from './node-env';

config({
	path:
		process.env['NODE_ENV'] === 'development'
			? join(process.cwd(), 'development.env')
			: join(process.cwd(), 'production.env'),
});
