import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "./ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ratingService from "../Services/ratingService";

const StoreCard = ({ store }) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ratingService.submitRating,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
      setSelectedRating(0);
      setHoveredRating(0);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRating < 1 || selectedRating > 5) return;
    mutate({
      storeId: store.id,
      ratingValue: selectedRating,
    });
  };

  return (
    <Card className="p-4 border rounded-2xl shadow-sm hover:shadow-md transition">
      <CardHeader className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="/store.jpeg" />
          <AvatarFallback>S</AvatarFallback>
        </Avatar>
        <CardTitle className="font-semibold">{store.name}</CardTitle>
      </CardHeader>
      <CardDescription className="flex flex-col gap-1 mt-2">
        <p>{store.address}</p>
        <p className="text-sm text-muted-foreground">
          Avg Rating: {store.averageRating} ⭐ ({store.ratingsCount} reviews)
        </p>
      </CardDescription>

      {/* Use DialogTrigger for the button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4 w-full rounded-2xl">Rate Store</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rate {store.name}</DialogTitle>
            <DialogDescription>
              Click the stars to rate this store.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer text-3xl ${
                    star <= (hoveredRating || selectedRating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setSelectedRating(star)}
                >
                  ★
                </span>
              ))}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="submit"
                  className="rounded-2xl"
                  disabled={isPending}
                >
                  {isPending ? "Submitting..." : "Submit Rating"}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default StoreCard;
