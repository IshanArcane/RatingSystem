import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import storeService from "../Services/storeService";
import { ScrollArea } from "./ui/scroll-area";
import StoreCard from "./StoreCard";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const StoresList = () => {
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("DESC");
  const [query, setQuery] = useState("");

  // Debounced query to prevent API spamming
  const debouncedQuery = useDebounce(query, 2 * 1000);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["stores", sort, order, debouncedQuery],
    queryFn: () => storeService.list({ sort, order, q: debouncedQuery }),
  });

  if (isLoading) return <p>Loading stores...</p>;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="flex flex-col gap-4">
      {/* Filter & Sort Controls */}
      <div className="flex gap-2 items-center mb-4">
        <Input
          placeholder="Search by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select onValueChange={(val) => setSort(val)}>
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Created At</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(val) => setOrder(val)}>
          <SelectTrigger>
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ASC">Ascending</SelectItem>
            <SelectItem value="DESC">Descending</SelectItem>
          </SelectContent>
        </Select>
        <Button className="rounded-2xl" onClick={() => {}}>
          Apply
        </Button>
      </div>

      {/* Store List */}
      <ScrollArea className="h-[80vh] w-[70vw] rounded-2xl border-2 p-4 mx-8">
        {data.rows.length === 0 ? (
          <p className="text-gray-500 text-center mt-8">No stores found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.rows.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default StoresList;
