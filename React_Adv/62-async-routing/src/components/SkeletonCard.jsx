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
export function CardsFallback({ amount = 10 }) {
	return (
		<>
			{Array(amount)
				.fill(null)
				.map((_, index) => {
					return <SkeletonCard key={`skeleton-card-${index}`} />;
				})}
		</>
	);
}

function SkeletonComment() {
	return (
		<div className="card">
			<div className="card-body">
				<div className="text-sm mb-1 skeleton"></div>
				<div className="skeleton"></div>
				<div className="skeleton"></div>
			</div>
		</div>
	);
}

export function CommentsFallback({ amount = 5 }) {
	return (
		<>
			{Array(amount)
				.fill(null)
				.map((_, index) => {
					return <SkeletonComment />;
				})}
		</>
	);
}
