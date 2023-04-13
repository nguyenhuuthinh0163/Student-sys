import axios from "axios";

const api = {
	request: (suffixUrl: string, method: string, data: any) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				axios({
					method: method,
					url: `${process.env.REACT_APP_API_URL}${suffixUrl}`,
					data: data
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error.response);
				});
			}, 0);
		});
	},
};

export default api;