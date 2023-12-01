"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";

import { useCart } from "@/hooks/useCart";
import { ColorChoise } from "./ColorChoise";
import { SetQuantity } from "./SetQuantity";
import { Button } from "../ui/Button";
import { ProductImages } from "./ProductImages";
import { CartProductType, IProduct, SelectedImgType } from "@/interfaces/interfaces";

const Horizontal = () => {
    return <hr className="w-[30%] my-2" />
};

export const ProductDetails:FC<{product: IProduct}> = ({product}) => {

    const {handleAddProductToCart, cartProducts} = useCart();
    const [isProductInCart, setIsProductInCart] = useState(false);

    const {id, slug, images, name, price, reviews, description, category, brand, inStock } = product;
    
    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id,
        name,
        slug,
        description,
        category,
        brand,
        selectedImg: {...images[0]},
        quantity: 1,
        price,
    });

    const router = useRouter()

    useEffect(() => {
        setIsProductInCart(false);

        if(cartProducts){
            const existingIndex = cartProducts.findIndex( (item) => item.id === product.id );

            if(existingIndex > -1){
                setIsProductInCart(true);
            }
        }
    }, [cartProducts, product.id]);
    

    const productRating = reviews.reduce( (acc, item) => item.rating + acc, 0) / reviews.length;

    const handleColorSelect = useCallback((value: SelectedImgType) => {
        setCartProduct( (prev) => {
            return {...prev, selectedImg: value}
        })
    }, []);

    const handleQuantityDecrease = useCallback(() => {

        if(cartProduct.quantity  === 1) return;

        setCartProduct((prev) => {
            return {...prev, quantity: prev.quantity - 1};
        });
     }, [cartProduct.quantity]);

    const handleQuantityIncrease = useCallback(() => {
        if(cartProduct.quantity  === 10) return;
        setCartProduct( (prev) => {
            return {...prev, quantity: prev.quantity + 1};
        });
     }, [cartProduct.quantity]);
   
  return (
    <div className="grid md:grid-cols-2 gap-12">
        {/* Images container */}
        <ProductImages
            cartProdct={cartProduct}
            product={product}
            handleColorSelect={handleColorSelect}
        />
        {/* Info container */}
        <div className="flex flex-col gap-1 text-slate-500 text-sm">
            <h2 className="text-3xl font-medium text-slate-700 capitalize">{name}</h2>
            <div className="flex items-center gap-x-2">
                <Rating value={productRating} readOnly />
                <div>{reviews.length} reviews</div>
            </div>
            <Horizontal />
            <div className="text-justify">{description}</div>
            <Horizontal />
            <div>
                <span className="font-semibold">Category:</span> {category.toUpperCase()}
            </div>
            <div>
                <span className="font-semibold">Brand:</span> {brand.toUpperCase()}
            </div>
            <div className={inStock ? 'text-teal-400' : 'text-rose-400'}>
                {inStock ? 'In Stock' : 'Out of stock'}
            </div>
            <Horizontal />
            {isProductInCart 
                ? (
                <>
                    <p className="mb-2 text-slate-500 flex items-center gap-1">
                        <MdCheckCircle className='text-teal-400' size={20} />
                        <span>Product added to cart</span>
                    </p>
                    <div className="max-w-[300px]">
                        <Button label="View Cart" outline onClick={() => router.push('/cart')} />
                    </div>
                </>
                ) : (
                <>
                    <ColorChoise 
                        images={images} 
                        cartProduct={cartProduct} 
                        handleColorSelect={handleColorSelect} 
                    />
                    <Horizontal />
                    <SetQuantity 
                        cartProduct={cartProduct} 
                        handleQuantityDecrease={handleQuantityDecrease} 
                        handleQuantityIncrease={handleQuantityIncrease} 
                    />
                    <Horizontal />
                    <div className="md:max-w-[300px]">
                        <Button 
                            label="Add to Cart"
                            onClick={() => handleAddProductToCart(cartProduct)}
                        />
                    </div>
                </>
                )}
        </div>
    </div>
  )
}
