import type { ModuleMetaPayload } from '../../interfaces/index';

import { ModuleMetaType } from '../../enums/index';

const ExampleModule: ModuleMetaPayload = {
	description: 'Example!',
	type: ModuleMetaType.Dev,
	version: '0.0.0',
};

export { ExampleModule };
