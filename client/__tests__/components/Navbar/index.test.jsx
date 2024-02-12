import { fireEvent, render } from '@testing-library/react';
import Redux, { Provider } from 'react-redux';
import RouterDom from 'react-router-dom';

import Navbar from '@components/Navbar';
import store from '@store';
import Language from '@containers/Language';

const ParentComponent = (children) => (
  <Provider store={store}>
    <Language>
      {children}
    </Language>
  </Provider>
);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));


jest.mock('reselect', () => ({
  ...jest.requireActual('reselect')
}));

const navigate = jest.fn().mockName('navigate');
const dispatch = jest.fn().mockName('dispatch');

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.spyOn(RouterDom, 'useNavigate').mockImplementation(() => navigate);
  });

  test('Correct render', () => {
    const navbar = render(ParentComponent(<Navbar title="Title" />));
    expect(navbar.getByTestId('navbar')).toBeInTheDocument();
  });

  test('Button profile clicked to open and close', () => {
    const navbar = render(ParentComponent(<Navbar title="Title" isUserLoginedTest={true} />));

    const profileBtn = navbar.getByTestId('nav-profile-btn')
    fireEvent.click(profileBtn);

    expect(navbar.queryByTestId('nav-dropdown')).toBeInTheDocument();
  });

  test('Button lang clicked', () => {
    const navbar = render(ParentComponent(<Navbar title="Title" isUserLoginedTest={true} />));

    const langBtn = navbar.getByTestId('nav-lang-btn')
    fireEvent.click(langBtn);

    expect(navbar.queryByTestId('nav-lang-id')).toBeInTheDocument();
    expect(navbar.queryByTestId('nav-lang-en')).toBeInTheDocument();
  });

  test('Button home clicked', () => {
    const navbar = render(ParentComponent(<Navbar title="Title" theme='light' isUserLoginedTest={true} />));

    const homeBtn = navbar.getByTestId('nav-home-link')
    fireEvent.click(homeBtn);

    expect(navigate).toHaveBeenCalledWith(`/`);
  });

  test('Button login clicked', () => {
    const navbar = render(ParentComponent(<Navbar title="Title" theme='light' isUserLoginedTest={false} />));

    const loginBtn = navbar.getByTestId('nav-login-btn')
    fireEvent.click(loginBtn);

    expect(navigate).toHaveBeenCalledWith(`/login`);
  });

  test('Button register clicked', () => {
    const navbar = render(ParentComponent(<Navbar title="Title" theme='light' isUserLoginedTest={false} />));

    const registerBtn = navbar.getByTestId('nav-register-btn')
    fireEvent.click(registerBtn);

    expect(navigate).toHaveBeenCalledWith(`/register`);
  });

  test('Should match with snapshot', () => {
    const navbar = render(ParentComponent(
      < Navbar title="Title" />
    ));
    expect(navbar).toMatchSnapshot();
  });
});
