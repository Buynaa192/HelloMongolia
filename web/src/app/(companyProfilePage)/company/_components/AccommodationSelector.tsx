"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { api } from "@/axios";

type Accommodation = {
  _id: string;
  hotelName: string;
  address: string;
};

type Props = {
  value: string;
  onChange: (id: string) => void;
};

export const AccommodationSelector = ({ value, onChange }: Props) => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [search, setSearch] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newHotelName, setNewHotelName] = useState("");
  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const res = await api.get("/accommodations");
        setAccommodations(res.data.accommodations);
      } catch (err) {
        console.error("Failed to fetch accommodations", err);
      }
    };

    fetchAccommodations();
    console.log("ac", accommodations);
  }, []);

  const filtered = accommodations.filter((a) =>
    a.hotelName.toLowerCase().includes(search.toLowerCase())
  );

  const createAccommodation = async () => {
    try {
      const res = await api.post("/accommodations/post", {
        hotelName: newHotelName,
        address: newAddress,
      });
      const newItem = res.data.accommodation;
      setAccommodations((prev) => [...prev, newItem]);
      onChange(newItem._id);
      setShowCreateDialog(false);
      setNewHotelName("");
      setNewAddress("");
      setSearch("");
    } catch (err) {
      console.error("Failed to create accommodation", err);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Accommodation</Label>
      <Input
        placeholder="Search or select accommodation"
        value={accommodations.find((a) => a._id === value)?.hotelName || search}
        onChange={(e) => setSearch(e.target.value)}
        onBlur={() => {
          const matched = accommodations.find((a) =>
            a.hotelName.toLowerCase().includes(search.toLowerCase())
          );
          if (matched) onChange(matched._id);
        }}
      />

      {filtered.length > 0 && (
        <div className="border rounded max-h-40 overflow-y-auto">
          {filtered.map((a) => (
            <div
              key={a._id}
              className={`p-2 cursor-pointer hover:bg-gray-100 ${
                a._id === value ? "bg-gray-200" : ""
              }`}
              onClick={() => {
                onChange(a._id);
                setSearch(a.hotelName);
              }}>
              {a.hotelName}
            </div>
          ))}
        </div>
      )}

      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogTrigger asChild>
          <Button type="button" variant="outline" className="mt-2">
            ➕ Create New Accommodation
          </Button>
        </DialogTrigger>
        <DialogContent className="space-y-4">
          <DialogTitle>New Accommodation</DialogTitle>
          <Input
            placeholder="Hotel Name"
            value={newHotelName}
            onChange={(e) => setNewHotelName(e.target.value)}
          />
          <Input
            placeholder="Address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
          <Button onClick={createAccommodation} disabled={!newHotelName}>
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
