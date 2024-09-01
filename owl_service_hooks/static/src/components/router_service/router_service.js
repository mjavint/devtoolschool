/** @odoo-module **/

import { registry } from '@web/core/registry';
import { Layout } from '@web/search/layout';
import { getDefaultConfig } from '@web/views/view';
import { useService } from '@web/core/utils/hooks';
import { routeToUrl } from '@web/core/browser/router_service';
import { browser } from '@web/core/browser/browser';

import { Component, useSubEnv } from '@odoo/owl';

export class RouterService extends Component {
  setup() {
    useSubEnv({
      config: {
        ...getDefaultConfig(),
        ...this.env.config,
      },
    });
    this.routerService = useService('router');
  }

  setRouteInUrl() {
    const { pathname, search, hash } = this.routerService.current;
    console.log(pathname);
    console.log(search);
    console.log(hash);
    search.debug = 'assets';
    search.name = 'devtoolschool';
    hash.action = 244;
    hash.view_type = 'form';
    browser.location = browser.location.origin + routeToUrl(this.routerService.current);
  }
}

RouterService.template = 'owl_service_hooks.routerService';
RouterService.components = { Layout };

registry.category('actions').add('owl_service_hooks.routerService', RouterService);
