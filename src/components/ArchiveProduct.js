import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ArchiveProduct({ product, isActive, fetchData }) {
	const navigate = useNavigate()

  const archiveToggle = (product) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${product._id}/archive`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("here:", data);
        if (data.message === "Product successfully archived") {
          Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Product successfully archived'
          });
          // Assuming fetchData is a function to refetch the data
          fetchData();
          navigate('/admindashboard')
        } else {
          Swal.fire({
            title: 'Something Went Wrong',
            icon: 'Error',
            text: 'Please Try again'
          });
          // Assuming fetchData is a function to refetch the data
          fetchData()

          
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const activateToggle = (product) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${product._id}/activate`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("look:", data);
        if (data.message === 'Product successfully activated') {
          Swal.fire({
            title: 'Success',
            icon: 'success',
            text: 'Product successfully activated'
          });
          // Assuming fetchData is a function to refetch the data
          fetchData()
          navigate('/admindashboard')
   
        } else {
          Swal.fire({
            title: 'Something Went Wrong',
            icon: 'Error',
            text: 'Please Try again'
          });
          // Assuming fetchData is a function to refetch the data
          fetchData();
          
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      {isActive ?
        <Button variant="danger" size="sm" onClick={() => archiveToggle(product)}>Archive</Button> :
        <Button variant="success" size="sm" onClick={() => activateToggle(product)}>Activate</Button>
      }
    </>
  );
}



