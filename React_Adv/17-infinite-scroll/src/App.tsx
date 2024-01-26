import { useCallback, useEffect, useState } from "react";
import { IImageData, IUseFetchLinkHeaderValues, useFetchWithLinkHeader } from "./utils/useFetch";

const URL_SHORTLIST = "http://127.0.0.1:3000/photos";
const LIMIT = 20;

function App() {
	const [currentPage, setCurrentPage] = useState(1);
	const [images, setImages] = useState(Array<IImageData>);
	const {
		loading,
		error,
		value: imgData,
	} = useFetchWithLinkHeader<IUseFetchLinkHeaderValues<IImageData>>(
		`${URL_SHORTLIST}?_page=${currentPage}&_limit=${LIMIT.toString()}`,
		{
			method: "GET",
		},
		[currentPage]
	);

	const lastElementObserver = new IntersectionObserver((elements, observer) => {
		if (elements[0].isIntersecting) {
			setCurrentPage((page) => page + 1);
			observer.unobserve(elements[0].target);
		}
	}, {});

	const lastImgRef = useCallback((img: HTMLImageElement) => {
		if (img == null) return;
		lastElementObserver.observe(img);
	}, []);

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
			{loading
				? Array(LIMIT)
						.fill(null)
						.map((_, index) => {
							return (
								<div className="skeleton" key={`skeleton-${index}`}>
									Loading...
								</div>
							);
						})
				: ""}
		</div>
	);
}

export default App;
