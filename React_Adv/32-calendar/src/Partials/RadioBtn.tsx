import type { ComponentProps } from "react";

type RadioBtnProps = {} & ComponentProps<"input">;

export function RadioBtn({ ...props }: RadioBtnProps) {
	return <input {...props} type="radio" />;
}
