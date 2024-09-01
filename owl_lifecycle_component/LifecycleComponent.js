import {
  Component,
  useState,
  onWillStart,
  onWillRender,
  onRendered,
  onWillMounted,
  onWillUpdateProps,
  onWillPatch,
  onPatched,
  onWillUnmounted,
  onWillDestroy,
  onError,
} from '@odoo/owl';

class LifecycleComponent extends Component {
  setup() {
    this.state = useState({ count: 0 });

    onWillStart(async () => {
      this.data = await fetchData();
    });

    onWillRender(() => {
      console.log('Component will render');
    });

    onRendered(() => {
      console.log('Component has been rendered');
    });

    onWillMounted(() => {
      this.el
        .querySelector('button')
        .addEventListener('click', this.increment.bind(this));
    });

    onWillUpdateProps((nextProps) => {
      return this.loadData({ id: nextProps.id });
    });

    onWillPatch(() => {
      this.scrollState = this.getScrollState();
    });

    onPatched(() => {
      this.scrollState = this.getScrollState();
    });

    onWillUnmounted(() => {
      this.el
        .querySelector('button')
        .removeEventListener('click', this.increment.bind(this));
    });

    onWillDestroy(() => {
      console.log('Component will be destroyed');
    });

    onError((error) => {
      console.error('An error occurred: ', error);
    });
  }
}
