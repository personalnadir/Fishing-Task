import axios from 'axios';
const url = process.env.REACT_APP_SEND_DATA_URL;
const types = {
	trials: 'store',
	vas: 'vas',
	keySelection: 'keys',
	imageSelection: 'gallery'
};

export default function submitData(type, payload) {
	const path = types[type];
	axios.post(url + path, payload)
	  .then(function (response) {
	    // handle success
	    console.log(response);
	  })
	  .catch(function (error) {
	    // handle error
	    console.log(error);
	  });
}

