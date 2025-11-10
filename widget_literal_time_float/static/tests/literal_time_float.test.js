import { describe, expect, test } from '@odoo/hoot';
import { queryOne } from '@odoo/hoot-dom';
import {
  models,
  fields,
  defineModels,
  mountView,
  onRpc,
  contains,
  clickSave,
} from '@web/../tests/web_test_helpers';

class Task extends models.Model {
  _name = 'ob.task';

  name = fields.Char();
  duration = fields.Float();

  _records = [
    { id: 1, name: 'Implementación de Prueba 1', duration: 0 },
    { id: 2, name: 'Implementación de Prueba 2', duration: 0.5 }, // 30m
    { id: 3, name: 'Implementación de Prueba 3', duration: 1.5 }, // 1h 30m
    { id: 4, name: 'Implementación de Prueba 4', duration: 25.5 }, // 1d 1h 30m
  ];
}

defineModels([Task]);

// Initial State
describe('Initial State', () => {
  test('Empty field displays nothing', async () => {
    await mountView({
      type: 'form',
      resModel: 'ob.task',
      resId: 1,
      arch: `
            <form>
                <sheet>
                    <field name="duration" widget="literal_time_float" />
                </sheet>
            </form>
        `,
    });
    const input = queryOne('input.o_input');
    expect(input).toHaveValue('', {
      message: 'Empty duration should show empty input',
    });
  });
  test('Existing value displays formatted (30m)', async () => {
    await mountView({
      type: 'form',
      resModel: 'ob.task',
      resId: 2,
      arch: `
            <form>
                <sheet>
                    <field name="duration" widget="literal_time_float" />
                </sheet>
            </form>
        `,
    });
    const input = queryOne('input.o_input');
    expect(input).toHaveValue('30m', {
      message: '0.5 hours should display as "30m"',
    });
  });
  test('Existing value displays formatted (1h 30m)', async () => {
    await mountView({
      type: 'form',
      resModel: 'ob.task',
      resId: 3,
      arch: `
            <form>
                <sheet>
                    <field name="duration" widget="literal_time_float" />
                </sheet>
            </form>
        `,
    });
    const input = queryOne('input.o_input');
    expect(input).toHaveValue('1h 30m', {
      message: '1.5 hours should display as "1h 30m"',
    });
  });
});

// Input Parsing
describe('Input Parsing', () => {
  test('Input "2m" saves as 0.3333 hours (2 minutes)', async () => {
    await mountView({
      type: 'form',
      resModel: 'ob.task',
      resId: 1,
      arch: `
            <form>
                <sheet>
                    <field name="duration" widget="literal_time_float" />
                </sheet>
            </form>
        `,
    });
    expect.assertions(2);
    onRpc('ob.task', 'web_save', ({ args }) => {
      const savedValue = args[1].duration;
      expect(savedValue).toBeCloseTo(0.3333, {
        message: '2m should save as ~0.3333 hours (2/60)',
      });
    });
    const input = queryOne('input.o_input');
    await contains(input).edit('2m');
    await clickSave();
    expect(input).toHaveValue('2m', {
      message: 'Input should display as "2m"',
    });
  });
});

// Complex Formats
describe('Complex Formats', () => {
  test('Input "1h 70m normalizes to "2h 10m" and saves as 2.1667 hours', async () => {
    await mountView({
      type: 'form',
      resModel: 'ob.task',
      resId: 1,
      arch: `
            <form>
                <sheet>
                    <field name="duration" widget="literal_time_float" />
                </sheet>
            </form>
        `,
    });
    expect.assertions(2);
    onRpc('ob.task', 'web_save', ({ args }) => {
      const savedValue = args[1].duration;
      expect(savedValue).toBeCloseTo(2.1667, {
        message: '1h 70m should save as ~2.1667 hours (130/60)',
      });
    });
    const input = queryOne('input.o_input');
    await contains(input).edit('1h 70m');
    await clickSave();
    expect(input).toHaveValue('2h 10m', {
      message: '1h 70m should normalize to "2h 10m"',
    });
  });
});

// Readonly Mode
describe('Readonly Mode', () => {
  test('Readonly field displays formatted value', async () => {
    await mountView({
      type: 'form',
      resModel: 'ob.task',
      resId: 3,
      arch: `
            <form>
                <sheet>
                    <field name="duration" widget="literal_time_float" readonly="1" />
                </sheet>
            </form>
        `,
    });
    const readonlyInput = queryOne('span.o_field_literal_time_float_readonly');
    expect(readonlyInput).toHaveText('1h 30m', {
      message: 'Readonly field should display formatted value "1h 30m"',
    });
  });
});
