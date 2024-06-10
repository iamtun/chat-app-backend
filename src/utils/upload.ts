const convertLocationFileUploaded = (location: string) => {
	return location.replace('.s3.ap-southeast-1.amazonaws.com', '');
};

export { convertLocationFileUploaded };
