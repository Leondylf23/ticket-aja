import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import clasess from './style.module.scss';
import TicketCard from '@components/TicketCard';

const Home = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  useEffect(() => {

  }, [dispatch]);
  useEffect(() => {
    setData([
      {
        id: 1,
        name: 'aaa',
        location: 'Bangkok',
      },
      {
        id: 2,
        name: 'aaa',
        location: 'Bangkok',
      },
      {
        id: 3,
        name: 'aaa',
        location: 'Bangkok',
      },
      {
        id: 4,
        name: 'aaa',
        location: 'Bangkok',
      },
      {
        id: 5,
        name: 'aaa',
        location: 'Bangkok',
      },
      {
        id: 6,
        name: 'aaa',
        location: 'Bangkok',
      },
      {
        id: 7,
        name: 'aaa',
        location: 'Bangkok',
      },
    ]);
  }, []);

  return (
    <div className={clasess.mainContainer}>
      <h1>Browse Tickets</h1>
      <div className={clasess.dataContainer}>
        {data.length > 0 ? <div className={clasess.dataGrid}>
          <div className={clasess.innerDataGrid}>
            {data.map(ticket => <TicketCard data={ticket} key={ticket?.id} />)}
          </div>
        </div> : <div className={clasess.empty}>
          <h3>Kosong</h3>
        </div>}
      </div>
    </div>
  );
};

export default Home;
