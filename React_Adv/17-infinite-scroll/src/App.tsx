import { useCallback, useEffect, useState } from "react";
import { IImageData, IUseFetchLinkHeaderValues, useFetchWithLinkHeader } from "./utils/useFetch";

const URL_SHORTLIST = "http://127.0.0.1:3000/photos-short-list";

function App() {
	const [currentPage, setCurrentPage] = useState(1);
	const [images, setImages] = useState(Array<IImageData>);
	const {
		loading,
		error,
		value: imgData,
	} = useFetchWithLinkHeader<IUseFetchLinkHeaderValues<IImageData>>(`${URL_SHORTLIST}?_page=${currentPage}&_limit=20`, {
		method: "GET",
	});

	const lastElementObserver = new IntersectionObserver((elements, observer) => {
		if (elements[0].isIntersecting) {
			console.log("intersecting!");
			observer.unobserve(elements[0].target);
		}
	}, {});

	const lastImgRef = useCallback((img: HTMLImageElement) => {
		if (img == null) return;
		lastElementObserver.observe(img);
	}, []);

	// function getNewImages() {
	// 	const {
	// 		loading,
	// 		error,
	// 		value: _imgData,
	// 	} = useFetchWithLinkHeader<IUseFetchLinkHeaderValues<IImageData>>(
	// 		`${URL_SHORTLIST}?_page=${currentPage}&_limit=20`,
	// 		{
	// 			method: "GET",
	// 		}
	// 	);
	// 	setCurrentPage((page) => page + 1)
	//   return _imgData;
	// }

	useEffect(() => {
		if (imgData)
			setImages((oldImgs) => {
				return [...oldImgs, ...imgData.data];
			});
	}, [imgData]);

	return (
		<div className="grid">
			{images.map((img, index) => {
				if (index === images.length - 1) return <img key={index} src={img.url} ref={lastImgRef} />;
				return <img key={index} src={img.url} />;
			})}
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
