import axios from 'axios';
const url = 'http://161.35.160.140/api/login';

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
		    	reject(error)
	  		});
	});
};

