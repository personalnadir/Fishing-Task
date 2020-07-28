import axios from 'axios';
const url = process.env.REACT_APP_LOGIN_URL;

export default function checkLoginID(id) {
	return new Promise((resolve, reject) => {
		axios.get(url + `/${id}`)
		 	.then(function (response) {
			    if (response.status === 200) {
			    	if (response.data.ab) {
			    		resolve(response.data.ab);
			    	} else {
			    		reject(response.data.error);
			    	}
			    }
		  	})
		  	.catch(function (error) {
		    	reject(error);
	  		});
	});
};

