export const HomePageTitle = ({ title }: { title: string }) => {
  return (
    <div className="w-full flex justify-center font-bold text-5xl py-5 bg-white">
      {title}
    </div>
  );
};
