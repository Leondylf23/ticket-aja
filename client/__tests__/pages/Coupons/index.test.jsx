import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import RouterDom from 'react-router-dom';

import Coupons from '@pages/Coupons';
import store from '@store';
import Language from '@containers/Language';


jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux')
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}));

jest.mock('reselect', () => ({
    ...jest.requireActual('reselect')
}));

const ParentComponent = (children) => (
    <Provider store={store}>
        <Language>
            {children}
        </Language>
    </Provider>
);

// const navigate = jest.fn().mockName('navigate');

describe('Coupons Page', () => {
    // beforeEach(() => {
    //     jest.spyOn(RouterDom, 'useNavigate').mockImplementation(() => navigate);
    // });

    test('Rendered', () => {
        const { getByTestId } = render(ParentComponent(
            <Coupons />
        ));
        const couponsPage = getByTestId('coupons-page');
        expect(couponsPage).toBeInTheDocument();
    });

    test('Should match with snapshot', () => {
        const couponsPage = render(ParentComponent(
            <Coupons />
        ));
        expect(couponsPage).toMatchSnapshot();
      });
});
