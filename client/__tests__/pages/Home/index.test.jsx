import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import RouterDom from 'react-router-dom';

import TicketCard from '@components/TicketCard';
import store from '@store';
import Language from '@containers/Language';
import { numberWithPeriods } from '@utils/allUtils';


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

const navigate = jest.fn().mockName('navigate');
const testData = {
    id: 1,
    title: 'Test title',
    location: 'Location tes',
    organization: 'test organization',
    variants: ['test', 'variant', '1'],
    price: 100000,
    imageUrl: 'http://example.com/'
};


describe('Ticket Card Component', () => {
    beforeEach(() => {
        jest.spyOn(RouterDom, 'useNavigate').mockImplementation(() => navigate);
    });

    test('Rendered', () => {
        const { getByTestId } = render(ParentComponent(
            <TicketCard />
        ));
        const ticketCardComponent = getByTestId('ticket-card');
        expect(ticketCardComponent).toBeInTheDocument();
    });

    test('Show correct text in data', () => {

        const { getByTestId } = render(ParentComponent(
            <TicketCard open data={testData}>
                {testData}
            </TicketCard >
        ));

        const imgElement = document.querySelector('img');

        expect(imgElement.src).toBe(testData?.imageUrl);
        expect(getByTestId('ticket-card-title').textContent).toBe(testData?.title);
        expect(getByTestId('ticket-card-location').textContent).toBe(testData?.location);
        expect(getByTestId('ticket-card-org').textContent).toBe(testData?.organization);
        expect(getByTestId('ticket-card-variant').textContent).toBe(testData?.variants.join(', '));
        expect(getByTestId('ticket-card-price').textContent).toBe(`Rp. ${numberWithPeriods(testData?.price)}`);
    });

    test('Role customer get navigate to /ticket/:id', () => {
        const { getByTestId } = render(ParentComponent(
            <TicketCard data={testData} isBusiness={false} />
        ));

        const divOnClick = getByTestId('ticket-card');

        fireEvent.click(divOnClick);
        expect(navigate).toHaveBeenCalledWith(`/ticket/${testData?.id}`);
    });

    test('Role Business get navigate to /ticketcreation/:id', () => {
        const { getByTestId } = render(ParentComponent(
            <TicketCard data={testData} isBusiness={true} />
        ));

        const divOnClick = getByTestId('ticket-card');

        fireEvent.click(divOnClick);
        expect(navigate).toHaveBeenCalledWith(`/ticketcreation/${testData?.id}`);
    });

    test('Should match with snapshot', () => {
        const ticketCard = render(ParentComponent(
            <TicketCard data={testData} isBusiness={false} />
        ));
        expect(ticketCard).toMatchSnapshot();
      });
});
