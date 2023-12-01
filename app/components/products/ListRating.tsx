"use client";

import { FC } from "react";
import moment from "moment";
import { IProduct } from "@/interfaces/interfaces";

import { Heading } from "../ui/Heading";
import { Avatar, Rating } from "@mui/material";

interface Props {
    product: IProduct;
}

export const ListRating:FC<Props> = ({product}) => {
  return (
    <div>
        <Heading title="Product Review" />
        <div className="text-sm mt-2">
            {product.reviews && product.reviews.map( (review) => (
                <div key={review.id} className="max-w-[300px]">
                    <div className="flex gap-2 items-center">
                        <Avatar src={review.user.image} />
                        <div className="font-semibold capitalize"> {review.user.name} A</div>
                        <div className="font-light">{moment(review.createdDate).fromNow()}</div>
                    </div>
                    <div className="mt-2">
                        <Rating value={review.rating} readOnly />
                        <div className="ml-2">{review.comment}</div>
                        <hr className="my-4" />
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
