import { Search } from "./_components/search";
import { SearchFilter } from "./_components/searchFIlter";
import { TravelPlanHome } from "./_components/travelPLanHome";

export default function PackagesExplore() {
  return (
    <div className="w-full h-full ">
      <TravelPlanHome />
      <Search />
      <div className="bg-white w-full ">HOME | EXPLORE PLANS</div>
      <SearchFilter />
    </div>
  );
}
