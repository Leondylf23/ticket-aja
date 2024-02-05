import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import clasess from './style.module.scss';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {

  }, [dispatch]);

  return (
    <div className={clasess.a}>
      <div>

      </div>
    </div>
  );
};

export default Home;
