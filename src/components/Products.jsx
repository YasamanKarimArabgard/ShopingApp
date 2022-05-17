import React, { useState } from 'react';
// import * as data from '../data';
import { IconButton } from "@mui/material";
import { useCartActions } from "../context/CartProvider";
import { checkInCart } from "../utils/CheckInCart";
import { ToastAlert } from "./ToastAlert";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Searchbar from './Searchbar';
import { useProducts } from '../context/ProductsProvider';

const Products = () => {

    const products = useProducts();

    const [open, setOpen] = useState(false);
    const [filteredItems, setFilteredItems] = useState(products)

    // console.log(products);
    const dispatch = useCartActions();

    const addToCartHandler = (product) => {
        setOpen(true)
        dispatch({ type: 'Add_To_Cart', payload: product })
    }

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <main className="products_container col-12 d-flex flex-column align-items-center">
                <section className='searchbar_container col-9 d-flex justify-content-center'>
                    <Searchbar products={products} filteredItems={filteredItems} setFilteredItems={setFilteredItems} />
                </section>
                <section className="product_list col-12 d-flex flex-wrap justify-content-center mb-2">
                    {filteredItems.map(product => (
                        <section className="product col-5 col-md-3 bg-white rounded m-1 p-2" key={product.id}>
                            <div>
                                <img src={product.image} className="w-100 h-auto"></img>
                            </div>
                            <div className='product-information col-12 col-m-12 d-flex flex-column align-items-center p-1'>
                                <div className="col-12 pt-1">
                                    <h6 className='col-12'>{product.name}</h6>
                                </div>
                                <div className='col-12 d-flex align-items-end justify-content-between'>
                                    <h6 className='col-9'>{product.price}$</h6>
                                    <div className='col-3 d-flex justify-content-end'>
                                        <IconButton
                                            sx={{ bgcolor: 'lightPink.main' }}
                                            onClick={() => addToCartHandler(product)}
                                            color='secondary'
                                            disableElevation
                                        >
                                            <ShoppingCartOutlinedIcon color="secondary" />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                            <ToastAlert open={open} handleClose={handleClose} />
                        </section>
                    ))}
                </section>
            </main>
        </>
    );
};

export default Products;