import { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';
import AdminView from '../components/AdminView';
import UserView from '../components/UserView';

export default function Orders() {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    // Check if the user context has the necessary information
    if (user && user.isAdmin !== undefined && localStorage.getItem('token')) {
      let fetchUrl = user.isAdmin ? `${process.env.REACT_APP_API_BASE_URL}/orders/all-orders` : 'http://localhost:4003/b3/orders/my-orders';
      const method = user.isAdmin ? 'GET' : 'POST';

      try {
        const response = await fetch(fetchUrl, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Raw data from server:', data);

        if (typeof data.message !== 'string') {
          setOrders(data);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setOrders([]);
      }
    }
  };

  fetchData();
}, [user]);

  return (
    <>
      {user.isAdmin === true ? (
        <AdminView ordersData={orders}/>
      ) : (
         <UserView ordersData={orders}/>
      )}
    </>
  );
}
