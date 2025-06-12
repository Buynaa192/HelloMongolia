export const HomePageTitle = ({ title }: { title: string }) => {
  return (
    <div className="w-full h-[120px] flex  items-center justify-center font-bold text-5xl py-5 text-white">
      {title}
    </div>
  );
};
