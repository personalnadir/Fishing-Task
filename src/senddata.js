import axios from 'axios';
const url = process.env.REACT_APP_SEND_DATA_URL;

export default function submitData(payload) {
	axios.post(url, payload)
	  .then(function (response) {
	    // handle success
	    console.log(response);
	  })
	  .catch(function (error) {
	    // handle error
	    console.log(error);
	  });
}

