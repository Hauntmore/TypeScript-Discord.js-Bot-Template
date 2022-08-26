import type { ModuleMetaPayload } from '../../interfaces';

import { ModuleMetaType } from '../../enums';

const ExampleModule: ModuleMetaPayload = {
	description: 'Example!',
	type: ModuleMetaType.Dev,
	version: '0.0.0',
};

export { ExampleModule };
