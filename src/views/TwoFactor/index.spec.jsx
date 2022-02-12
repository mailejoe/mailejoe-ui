import { configure, mount } from 'enzyme';
import React from 'react';
import TwoFactor from '.';
import { Form, Field } from 'formik';
import Adapter from 'enzyme-adapter-react-16';
import Button from '../../components/Button';
import axios from 'axios';

jest.mock('axios');

configure({ adapter: new Adapter() });

let wrapper;
describe('<TwoFactor />', () => {
  beforeEach(() => {
    wrapper = mount(<TwoFactor />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render snapshot', () => {
    expect(TwoFactor).toMatchSnapshot();
  });

  it('should do a basic render', () => {
    expect(wrapper.find('.auth-container')).toHaveLength(1);
    expect(wrapper.find('.header')).toHaveLength(1);
    expect(wrapper.find('.auth-bg')).toHaveLength(1);
    expect(wrapper.find('.logo')).toHaveLength(1);
    expect(wrapper.find('.form-container')).toHaveLength(1);
    expect(wrapper.find(Form)).toHaveLength(1);
    expect(wrapper.find('img')).toHaveLength(1);

    expect(document.body.className).toBe('auth');
  });

  describe('TwoFactor Form', () => {
    it('should render the two factor form', () => {
      const form = wrapper.find(Form);
      expect(form).toHaveLength(1);
      expect(form.props().autoComplete).toBe('off');
      expect(form.props()['data-testid']).toBe('mfa:form');

      const formInputs = wrapper.find(Field);
      expect(formInputs).toHaveLength(1);

      const token = formInputs.at(0);
      expect(token.props().name).toBe('token');
      expect(token.props().type).toBe('text');
      expect(token.props().className).toBe('field');

      expect(wrapper.find('.form-error')).toHaveLength(0);

      const validateBtn = wrapper.find(Button);
      expect(validateBtn).toHaveLength(1);
      expect(validateBtn.props().color).toBe('#a44900');
      expect(validateBtn.props()['data-testid']).toBe('mfa:submit');
      expect(validateBtn.text()).toBe('Validate');

      expect(wrapper.find('.divider')).toHaveLength(1);
    });

    it('should handle an empty token', () => {
      const validateBtn = wrapper.find(Button);

      validateBtn.find('.button').simulate('click');

      setTimeout(() => {
        expect(wrapper.find('.form-error')).toHaveLength(1);
      }, 100);
    });

    it('should handle a change after validation', () => {
      const validateBtn = wrapper.find(Button);

      validateBtn.find('.button').simulate('click');

      setTimeout(() => {
        const formErrors = wrapper.find('.form-error');
        expect(formErrors).toHaveLength(1);
        expect(formErrors.at(0).text).toEqual('Required');

        const formInputs = wrapper.find(Field);
        expect(formInputs).toHaveLength(1);

        const token = formInputs.at(0);
        token.simulate('change', { target: { value: 'Hello' } });

        setTimeout(() => {
          expect(wrapper.find('.form-error')).toHaveLength(0);
        }, 100);
      }, 100);
    });
  });
});
