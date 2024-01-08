import { Link } from "react-router-dom";
import { IUserCardsProps } from "../../utils/types";

export function UserCard({ name, company, website, email, id }: IUserCardsProps) {
	return (
		<div className="card">
			<div className="card-header">{name}</div>
			<div className="card-body">
				<div>{company.name}</div>
				<div>{website}</div>
				<div>{email}</div>
			</div>
			<div className="card-footer">
				<Link className="btn" to={id.toString()}>
					View
				</Link>
			</div>
		</div>
	);
}
