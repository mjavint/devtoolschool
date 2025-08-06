/** @odoo-module **/

import { registry } from '@web/core/registry';
import { Layout } from '@web/search/layout';
import { getDefaultConfig } from '@web/views/view';

import { Component, useSubEnv, useState, onWillStart } from '@odoo/owl';
import { useService } from '@web/core/utils/hooks';

export class PartnerComponent extends Component {
  static template = 'academy.PartnerComponent';
  static components = { Layout };
  static props = {};

  setup() {
    useSubEnv({
      config: {
        ...getDefaultConfig(),
        ...this.env.config,
      },
    });
    this.orm = useService('orm');
    this.http = useService('http');
    this.notification = useService('notification');

    this.state = useState({
      partners: [],
      posts: [],
      filterPartnerText: '',
      filterPostText: '',
    });

    onWillStart(async () => {
      await this.fetchPartners();
      await this.fetchPosts();
    });
  }

  async fetchPartners() {
    try {
      const partners = await this.orm.call(
        'res.partner',
        'search_read',
        [[['is_company', '=', true]]],
        {
          fields: ['name', 'email'],
        }
      );
      this.state.partners = partners;
    } catch (error) {
      this.notification.add('Error al cargar partners', { type: 'danger' });
    }
  }

  async fetchPosts() {
    try {
      const url = `https://jsonplaceholder.org/posts`;
      const response = await this.http.get(url);
      this.state.posts = response;
    } catch (error) {
      this.notification.add('Error al cargar posts', { type: 'danger' });
    }
  }

  filterPartners() {
    return this.state.partners.filter((partner) =>
      partner.name.toLowerCase().includes(this.state.filterPartnerText.toLowerCase())
    );
  }

  filterPosts() {
    return this.state.posts.filter((post) =>
      post.title.toLowerCase().includes(this.state.filterPostText.toLowerCase())
    );
  }

  refreshData() {
    this.fetchPartners();
    this.fetchPosts();
  }
}

registry.category('actions').add('academy.partner_component', PartnerComponent);
