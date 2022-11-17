import { Response } from "express";

export interface ResponseNoData {
	success: boolean;
	errorMessages?: string;
	errorCode?: number;
}

export interface ResponseData<T> extends ResponseNoData {
	data?: T;
}

export const successResponse = <T>(res: Response, data: T) => {
	const response: ResponseData<T> = {
		success: true,
		data,
	};
	res.status(200);
	res.json(response);
};

export const errorResponse = (
	res: Response,
	errorCode?: number,
	errorMessage?: string
) => {
	const response: ResponseData<void> = {
		success: false,
		errorCode,
		errorMessages: errorMessage,
	};
	res.status(errorCode ?? 500);
	res.json(response);
};
