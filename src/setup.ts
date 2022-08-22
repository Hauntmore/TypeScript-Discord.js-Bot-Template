process.env['NODE_ENV'] ??= 'development';

import { config } from 'dotenv';
import { join } from 'node:path';

config({
	path:
		process.env['NODE_ENV'] === 'development'
			? join(process.cwd(), 'test.env')
			: join(process.cwd(), '.env'),
});
