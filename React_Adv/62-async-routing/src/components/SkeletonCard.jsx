export function SkeletonCard() {
	return (
		<div className="card">
			<div className="card-header">
				<div className="skeleton"></div>
			</div>
			<div className="card-body">
				<div className="card-preview-text">
					<div className="skeleton"></div>
					<div className="skeleton"></div>
					<div className="skeleton"></div>
					<div className="skeleton"></div>
				</div>
			</div>
			<div className="card-footer">
				<div className="skeleton skeleton-btn"></div>
			</div>
		</div>
	);
}
export function CardsFallback() {
	return (
		<>
			{Array(10)
				.fill(null)
				.map((_, index) => {
					return <SkeletonCard key={`skeleton-card-${index}`} />;
				})}
		</>
	);
}
