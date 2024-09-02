/** @odoo-module **/

import { patch } from '@web/core/utils/patch';
import { WebClient } from '@web/webclient/webclient';
import { useSubEnv, useState } from '@odoo/owl';
import { TaskStore } from './task_store';

patch(WebClient.prototype, {
  setup() {
    super.setup();
    const taskStore = useState(new TaskStore());

    //add store to enviroment
    useSubEnv({ taskStore });
  },
});
