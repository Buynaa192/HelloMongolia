import { activityModel } from "../models/activity.model";
import { companyProfileModel } from "../models/user.models.by.role/CompanyProfile.model";
import { destinationModel } from "../models/destination.model";
import { packageModel } from "../models/package.model";

export const unifiedSearch = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Missing search query" });
    }

    const trimmed = q.trim();

    const safeQuery = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const containsRegex = new RegExp(safeQuery, "i");

    const [destinations, activities, companies, packages] = await Promise.all([
      destinationModel.find({ destinationName: containsRegex }),
      activityModel.find({ activityName: containsRegex }),
      companyProfileModel.find({ companyName: containsRegex }),
      packageModel.find({ title: containsRegex }).populate("companyId"),
    ]);

    const sortByStartsWith = (arr, field) =>
      arr.sort((a, b) => {
        const aStarts = a[field]
          .toLowerCase()
          .startsWith(trimmed.toLowerCase());
        const bStarts = b[field]
          .toLowerCase()
          .startsWith(trimmed.toLowerCase());
        return aStarts === bStarts ? 0 : aStarts ? -1 : 1;
      });

    interface SearchResult {
      destinations?: any[];
      activities?: any[];
      companies?: any[];
      packages?: any[];
    }

    const result: SearchResult = {};

    if (destinations.length > 0) {
      result.destinations = sortByStartsWith(destinations, "destinationName");
    }
    if (activities.length > 0) {
      result.activities = sortByStartsWith(activities, "activityName");
    }
    if (companies.length > 0) {
      result.companies = sortByStartsWith(companies, "companyName");
    }
    if (packages.length > 0) {
      result.packages = sortByStartsWith(packages, "title");
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Search failed:", error);
    res.status(500).json({ message: "Search failed" });
  }
};
