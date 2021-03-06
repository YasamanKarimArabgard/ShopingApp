import React, { createContext, useContext, useState } from 'react';
import * as data from '../data';

export const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {

    const getProducts = data.products;
    const [products] = useState(getProducts);

    return (
        <>
            <ProductsContext.Provider value={products}>
                {children}
            </ProductsContext.Provider>
        </>
    );
};

export const useProducts = () => useContext(ProductsContext);

export default ProductsProvider;