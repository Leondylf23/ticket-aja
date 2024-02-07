import { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import clasess from './style.module.scss';
import TicketCard from '@components/TicketCard';

const Home = ({ tickets }) => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {

  }, [dispatch]);
  useEffect(() => {
    setData([
      {
        id: 1,
        name: 'aaa',
        location: 'Jakarta Barat',
        organizer: 'Google Inc',
        price: 5000000,
        more: 'front, center, back'
      },

    ]);
  }, []);

  return (
    <div className={clasess.mainContainer}>
      <h1 className={clasess.title}><FormattedMessage id='home_title' /></h1>
      <div className={clasess.searchContainer}>
        <h4 className={clasess.title}><FormattedMessage id='home_title' /></h4>
        <input type="text" className={clasess.input} placeholder={intl.formatMessage({ id: 'home_search_placeholder' })} />
      </div>
      <div className={clasess.dataContainer}>
        {data.length > 0 ? <div className={clasess.dataGrid}>
          <div className={clasess.innerDataGrid}>
            {data.map(ticket =>
              <TicketCard data={ticket} key={ticket?.id} />
            )}
          </div>
        </div> : <div className={clasess.empty}>
          <h3><FormattedMessage id='empty_data' /></h3>
        </div>}
      </div>
    </div>
  );
};

Home.propTypes = {
  tickets: PropTypes.array
}

const mapStateToProps = createStructuredSelector({

});

export default connect(mapStateToProps)(Home);
