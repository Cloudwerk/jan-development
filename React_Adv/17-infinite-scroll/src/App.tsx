import { IImageData, IUseFetchLinkHeaderValues, useFetchWithLinkHeader } from "./utils/useFetch";

const URL_SHORTLIST = "http://127.0.0.1:3000/photos-short-list";

function App() {
	const {
		loading,
		error,
		value: imgData,
	} = useFetchWithLinkHeader<IUseFetchLinkHeaderValues<IImageData>>(`${URL_SHORTLIST}?_page=1&_limit=10`, {
		method: "GET",
	});
	console.log(imgData);

	return (
		<div className="grid">
			<img src="https://via.placeholder.com/600/92c952" />
			<img src="https://via.placeholder.com/600/771796" />
			<img src="https://via.placeholder.com/600/24f355" />
			<img src="https://via.placeholder.com/600/d32776" />
			<img src="https://via.placeholder.com/600/f66b97" />
			<img src="https://via.placeholder.com/600/92c952" />
			<div className="skeleton">Loading...</div>
			<div className="skeleton">Loading...</div>
			<div className="skeleton">Loading...</div>
			<div className="skeleton">Loading...</div>
			<div className="skeleton">Loading...</div>
			<div className="skeleton">Loading...</div>
		</div>
	);
}

export default App;
