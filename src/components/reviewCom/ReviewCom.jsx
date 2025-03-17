"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

export default function ReviewCom() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#121212] p-4">
      <Card className="w-full max-w-lg bg-[#1E1E1E] text-white border border-gray-700 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-lg font-bold">Review</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Rating Summary */}
          <div className="text-center mb-4">
            <p className="text-3xl font-bold">4.8 ★</p>
            <p className="text-gray-400 text-sm">
              1,64,002 Ratings & 5,922 Reviews
            </p>
            <div className="mt-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center text-sm">
                  <span className="text-yellow-400">{star}★</span>
                  <div className="w-40 h-2 bg-gray-600 ml-2 rounded overflow-hidden">
                    <div
                      className="h-full bg-gray-300"
                      style={{ width: `${star * 20}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex justify-center space-x-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-8 h-8 cursor-pointer ${
                  star <= rating ? "text-yellow-400" : "text-gray-500"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          {/* Review Textarea */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Please share your opinion about the product
            </label>
            <Textarea
              placeholder="Your review"
              className="bg-[#2A2A2A] border border-gray-600 text-white"
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <Button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold">
            Send Review
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
