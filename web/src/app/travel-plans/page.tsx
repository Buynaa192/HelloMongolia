import { FilteredPackages } from "./_components/filteredPackages";
import { Search } from "./_components/search";
import { SearchFilter } from "./_components/searchFIlter";
import { TravelPlanHome } from "./_components/travelPLanHome";

export default function PackagesExplore() {
  return (
    <div className="w-full h-full ">
      <TravelPlanHome />
       <div className="bg-white w-full p-2 ">HOME | EXPLORE PLANS</div>
      <Search />
      <SearchFilter />
      <FilteredPackages/>
    </div>
  );
}
