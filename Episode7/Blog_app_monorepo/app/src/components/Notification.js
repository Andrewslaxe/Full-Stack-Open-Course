import {useSelector} from "react-redux";
import Swal from "sweetalert2";

const Notification = () => {
  const {message, kind} = useSelector(state => state.notification)

  if (message === '') {
    return null
  }
  if (kind === 'success') {
    Swal.fire({
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 5000
    })
  } else if (kind === 'error') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      confirmButtonColor: "#0969d9",
    })

  }
}

export default Notification
