import { configure, mount } from 'enzyme';
import React from 'react';
import ForgotUsername from '.';
import { Form, Field } from 'formik';
import Adapter from 'enzyme-adapter-react-16';
import Button from '../../components/Button';
import axios from 'axios';

jest.mock('axios');

configure({ adapter: new Adapter() });

let wrapper;
describe('<ForgotUsername />', () => {
  beforeEach(() => {
    wrapper = mount(<ForgotUsername />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render snapshot', () => {
    expect(ForgotUsername).toMatchSnapshot();
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

  describe('ForgotUsername Form', () => {
    it('should render the forgot username form', () => {
      const form = wrapper.find(Form);
      expect(form).toHaveLength(1);
      expect(form.props().autoComplete).toBe('off');
      expect(form.props()['data-testid']).toBe('forgot-username:form');

      const formInputs = wrapper.find(Field);
      expect(formInputs).toHaveLength(1);

      const email = formInputs.at(0);
      expect(email.props().name).toBe('email');
      expect(email.props().type).toBe('text');
      expect(email.props().placeholder).toBe('Email');
      expect(email.props().className).toBe('field');

      expect(wrapper.find('.form-error')).toHaveLength(0);

      const remindMeBtn = wrapper.find(Button);
      expect(remindMeBtn).toHaveLength(1);
      expect(remindMeBtn.props().color).toBe('#a44900');
      expect(remindMeBtn.props()['data-testid']).toBe('forgot-username:submit');
      expect(remindMeBtn.text()).toBe('Remind Me');

      expect(wrapper.find('.divider')).toHaveLength(1);
    });

    it('should handle an empty email', () => {
      const remindMeBtn = wrapper.find(Button);

      remindMeBtn.find('.button').simulate('click');

      setTimeout(() => {
        expect(wrapper.find('.form-error')).toHaveLength(1);
      }, 100);
    });

    it('should handle a change after validation', () => {
      const remindMeBtn = wrapper.find(Button);

      remindMeBtn.find('.button').simulate('click');

      setTimeout(() => {
        const formErrors = wrapper.find('.form-error');
        expect(formErrors).toHaveLength(1);
        expect(formErrors.at(0).text).toEqual('Required');

        const formInputs = wrapper.find(Field);
        expect(formInputs).toHaveLength(1);

        const email = formInputs.at(0);
        email.simulate('change', { target: { value: 'Hello' } });

        setTimeout(() => {
          expect(wrapper.find('.form-error')).toHaveLength(0);
        }, 100);
      }, 100);
    });

    it('should handle successful submit', () => {
      const remindMeBtn = wrapper.find(Button);

      const formInputs = wrapper.find('.field');
      const email = formInputs.at(0);
      email.simulate('change', { target: { value: 'Hello' } });

      axios.post.mockImplementationOnce(() => Promise.resolve());

      remindMeBtn.find('.button').simulate('click');

      setTimeout(() => {
        expect(wrapper.find('.field')).toHaveLength(0);
        expect(wrapper.find('.submit-message')).toHaveLength(1);

        const remindMeBtn = wrapper.find(Button);
        expect(remindMeBtn.text()).toBe('Back to Login');
      }, 100);
    });
  });
});
