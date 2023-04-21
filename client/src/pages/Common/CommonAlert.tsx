import { Alert } from "@mui/material";

interface commonErrorProp {
	commonError: string | '';
}
export default function CommonAlert({ commonError }: commonErrorProp) {
	return <>{
		commonError ? (<Alert severity="error">{commonError}</Alert>) : ('')
	}</>;
}
