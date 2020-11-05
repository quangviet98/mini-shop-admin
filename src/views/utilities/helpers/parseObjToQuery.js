const obj1 = {
	page: 1,
	limit: 10,
	keyword: '',
	status: '',
	start_date: '',
	end_date: ''
};

function parseObjToQuery(obj = obj1) {
	let qr = '';
	if (!!obj) {
		const keys = Object.keys(obj);
		const values = Object.values(obj);
		qr += '?';
		keys.forEach((item, id) => {
			qr += `${item}=${values[id]}${id < keys.length - 1 ? '&' : ''}`;
		});
	}
	return qr;
}

export default parseObjToQuery;
