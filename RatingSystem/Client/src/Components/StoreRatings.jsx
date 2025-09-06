import React from "react";
import { useQuery } from "@tanstack/react-query";
import ratingService from "../Services/ratingService";

const StoreRatings = ({ storeId }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["storeRatings", storeId],
    queryFn: () => ratingService.fetchStoreRatings(storeId),
    enabled: !!storeId,
  });

  if (isLoading) return <p>Loading ratings...</p>;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;
  if (!data || data.length === 0) return <p>No ratings yet.</p>;

  return (
    <ul className="space-y-2">
      {data.map((rating) => (
        <li
          key={rating.id}
          className="border p-3 rounded-lg bg-muted/30 flex justify-between"
        >
          <div>
            <p className="font-semibold">{rating.user.name}</p>
            <p className="text-sm text-muted-foreground">{rating.user.email}</p>
          </div>
          <div className="font-bold">{rating.ratingValue} ⭐</div>
        </li>
      ))}
    </ul>
  );
};

export default StoreRatings;
