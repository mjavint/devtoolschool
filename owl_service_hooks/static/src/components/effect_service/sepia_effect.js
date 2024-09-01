/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, xml } from "@odoo/owl";

class SepiaEffect extends Component {}
SepiaEffect.template = xml`
    <div style="
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        background: rgba(124,87,0, 0.4);
    "></div>
`;

export function sepiaEffectProvider(env, params = {}) {
  return {
    Component: SepiaEffect,
  };
}

const effectRegistry = registry.category("effects");
effectRegistry.add("sepia", sepiaEffectProvider);
