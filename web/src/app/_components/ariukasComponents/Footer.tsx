export const Footer = () => {
	return (
		<footer className="w-full bg-gray-800 text-white py-8">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="text-center md:text-left mb-4 md:mb-0">
						<p>
							&copy; {new Date().getFullYear()} Ariukas Travel. All rights
							reserved.
						</p>
					</div>
					<div className="flex space-x-4">
						<a href="/privacy-policy" className="hover:underline">
							Privacy Policy
						</a>
						<a href="/terms-of-service" className="hover:underline">
							Terms of Service
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};
