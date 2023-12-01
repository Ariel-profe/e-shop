import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {toast} from "react-hot-toast";

import { CartProductType } from "@/interfaces/interfaces";

interface ContextProps {
    cartTotalQuantity: number;
    cartTotal: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQuantity: (product: CartProductType, type: "inc" | "dec") => void;
    handleClearCart: () => void;
    paymentIntent: string | null;
    handleSetPaymentIntent: (value: string | null) => void;
    isLoaded: boolean;
};

interface CartContextProviderProps {
    [propName: string]: any;
};

export const CartContext = createContext<ContextProps | null>(null);

export const CartContextProvider = (props: CartContextProviderProps) => {

    const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(null);
    const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null)

    useEffect(() => {
        setIsLoaded(false);
        const cartItemsInLS: any = localStorage.getItem('eShopCartItems');
        const cartProductsInLS: CartProductType[] | null = JSON.parse(cartItemsInLS);
        const eShopPaymentIntent:any = localStorage.getItem('eShopPaymentIntent');
        const paymentIntent: string | null = JSON.parse(eShopPaymentIntent);

        setCartProducts(cartProductsInLS);
        setPaymentIntent(paymentIntent);    
        setIsLoaded(true);
    }, []);  
    
    useEffect(() => {
        const getTotalPrice = () => {
            if(cartProducts){
                const {total, quantity} = cartProducts?.reduce( 
                    (acc, item) => {
                    const itemTotal = item.price * item.quantity;
    
                    acc.total += itemTotal;
                    acc.quantity += item.quantity;
    
                    return acc;
                }, {
                    total: 0,
                    quantity: 0
                });

                setCartTotalQuantity(quantity);
                setCartTotal(total);
            }
        };
        getTotalPrice();
    }, [cartProducts]);
    

    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updatedCart;

            if(prev){
                updatedCart = [...prev, product]
            }else {
                updatedCart = [product];
            }

            toast.success('Product added to cart', {id: 'addedToCart'});
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart))
            return updatedCart;
        })
    }, []);

    const handleRemoveProductFromCart = useCallback((product:CartProductType) => {

        if(cartProducts){
            const filteredProducts = cartProducts?.filter( item => item.id !== product.id);
            setCartProducts(filteredProducts);
            toast.success('Product removed', {id: 'removedFromCart'});
            localStorage.setItem('eShopCartItems', JSON.stringify(filteredProducts));
        };        
    }, [cartProducts]);

    const handleCartQuantity = useCallback((product:CartProductType, type: "inc" | "dec") => {
        let updatedCart;  
 
        if(cartProducts){
            updatedCart = [...cartProducts];
            
            const existingIndex = cartProducts.findIndex( (item) => item.id === product.id );

            if(existingIndex > -1){
                if(type === "inc") updatedCart[existingIndex].quantity = ++updatedCart[existingIndex].quantity
                if(type === "dec") updatedCart[existingIndex].quantity = --updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('eShopCartItems', JSON.stringify(updatedCart));
        };

    }, [cartProducts]);

    const handleClearCart = useCallback(() => {
        setCartProducts(null);
        setCartTotalQuantity(0)
        localStorage.setItem('eShopCartItems', JSON.stringify(null));
    }, []); 

    const handleSetPaymentIntent = useCallback((value: string | null) => {
        setPaymentIntent(value);
        localStorage.setItem('eShopPaymentIntent', JSON.stringify(value))
    }, []);

    const value = {
        cartTotalQuantity,
        cartTotal,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQuantity,
        handleClearCart,
        paymentIntent,
        handleSetPaymentIntent,
        isLoaded
    };

    return (
        <CartContext.Provider value={value} {...props} />
    )
};

export const useCart = () => {
    const context = useContext(CartContext);

    if(context === null){
        throw new Error("useCart must be ussed within a CartContextProvider")
    };

    return context;
};
