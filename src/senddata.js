import axios from 'axios';
const url = 'http://161.35.160.140/api/store';

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

