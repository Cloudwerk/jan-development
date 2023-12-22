interface UserLiProps {
	name: string;
}

export function UserLi({ name }: UserLiProps) {
	return <li>{name}</li>;
}
