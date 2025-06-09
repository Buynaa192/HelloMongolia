export const Videos = () => {
	return (
		<div className="absolute bottom-[10px] w-full flex items-center justify-center py-20 px-8 md:px-16 ">
			<div className="flex gap-3 overflow-hidden">
				{[1, 2, 3, 4, 5].map((video) => (
					<div
						key={video}
						className="bg-gray-200 rounded-lg shadow-lg w-[250px] overflow-hidden">
						<iframe
							width="100%"
							height="200"
							src={`https://www.youtube.com/embed/dQw4w9WgXcQ?start=${
								video * 30
							}`}
							title={`Video ${video}`}
							allowFullScreen
						/>
					</div>
				))}
			</div>
		</div>
	);
};
