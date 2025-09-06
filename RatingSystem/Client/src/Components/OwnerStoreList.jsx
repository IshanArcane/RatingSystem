import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../Context/authContext";
import storeService from "../Services/storeService";
import StoreRatings from "./StoreRatings";

import { Card, CardTitle, CardHeader, CardDescription } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";

const OwnerStoresList = () => {
  const { user } = useContext(AuthContext);
  const ownerId = user?.id;

  const [selectedStore, setSelectedStore] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["ownerStores", ownerId],
    queryFn: () => storeService.list({ ownerId }),
    enabled: !!ownerId,
  });

  if (!ownerId) return <p>You must be logged in as a Store Owner.</p>;
  if (isLoading) return <p>Loading stores...</p>;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <>
      <ScrollArea className="h-[70vh] w-full border-2 rounded-2xl p-4">
        <ul className="space-y-2">
          {data.rows.map((store) => (
            <Card
              key={store.id}
              className="p-4 border rounded-2xl shadow-sm cursor-pointer hover:bg-muted"
              onClick={() => setSelectedStore(store)}
            >
              <CardHeader className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="/store.jpeg" />
                  <AvatarFallback>ST</AvatarFallback>
                </Avatar>
                <CardTitle className="font-semibold">{store.name}</CardTitle>
              </CardHeader>
              <CardDescription className="flex flex-col gap-1 mt-2">
                <p>{store.address}</p>
                <p className="text-sm text-muted-foreground">
                  Avg Rating: {store.averageRating} ⭐ ({store.ratingsCount}{" "}
                  reviews)
                </p>
              </CardDescription>
            </Card>
          ))}
        </ul>
      </ScrollArea>

      {/* Ratings Dialog */}
      <Dialog
        open={!!selectedStore}
        onOpenChange={() => setSelectedStore(null)}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Ratings for {selectedStore?.name}</DialogTitle>
            <DialogDescription>
              User reviews and ratings for this store
            </DialogDescription>
          </DialogHeader>

          {selectedStore && <StoreRatings storeId={selectedStore.id} />}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OwnerStoresList;
