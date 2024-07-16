import React, { useEffect } from "react";

const TestComponent: React.FC = () => {
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("https://sandbox.creos.me/api/v1/comment");
				const data = await response;
				console.log(data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	return <div>Test Component</div>;
};

export default TestComponent;
