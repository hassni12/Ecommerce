import React, { useState, useEffect } from "react";
import { FormContainer } from "../component/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation, useNavigate, Outlet } from "react-router-dom";
import { registerUser } from "../component/slice/registerSlice";
import Loader from "../component/Loader";
import Message from "../component/Message";
// adminProductUpdateApi
// Form
import axios from "axios";
// adminGetProductByIdApi
// productFilterById

// productList
import { adminGetProductByIdApi, adminProductUpdateApi, resetAdminProduct } from "../component/slice/adminProductsSlice";
import { productList } from "../component/slice/productSlice";
import { productFilterById } from "../component/slice/productFilterSlice";
import { Form } from "react-bootstrap";
// import { Product } from "../component/Product";
export const AdminProductUpdateScreen = () => {
    const params = useParams();
    const navigation = useNavigate();
    const dispatch = useDispatch();
    // ,name, image, brand, description, category, countInStock, price
    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [countInStock, setCountInStock] = useState("")
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")
    const [upLoading, setUpLoading] = useState(false)
    const { id } = params;
    // console.log(id)
    const { isError, isLoading, isSuccess, productFilter: product } = useSelector((p) => p.productFilter);

    const { isSuccess: isSuccessProduct } = useSelector((p) => p.adminProduct);
    // console.log(product, "productslist")
    useEffect(() => {
        if (isSuccessProduct) {
            dispatch(resetAdminProduct())
            navigation(`/admin/productlist`)

        } else {
            if (!product.name || product._id !== id) {
                dispatch(productFilterById(id))
            } else {
                setName(product.name)
                setBrand(product.brand)
                setDescription(product.description)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setImage(product.image)
                setPrice(product.price)
            }
        }

    }, [dispatch, id, isSuccessProduct, navigation, product]);

    const uploadImageHandler = async (e) => {
        const file = e.target.files[0]
        console.log(file[0],"file",e,"e")
        const formData = new FormData()

        formData.append('image', file)
       console.log(formData,"formDataFile")
        try {

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",

                }
            }
            const { data } = await axios.post('http://localhost:8000/api/upload', formData, config)
            setImage(data)
            console.log(data, "axios image")
        } catch (error) {
            console.log(error)

        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(adminProductUpdateApi({ id, name, image, brand, description, category, countInStock, price }))

    };


    return (
        <FormContainer>
            <Link to="/admin/productlist" className="btn btn-primary my-3">Go Back</Link>
            {isError && <Message variant="danger">{isError}</Message>}
            {isLoading && <Loader />}
            {isLoading ? <Loader /> : isError ? <Message variant="danger">{isError}</Message> :
                <>
                    <form onSubmit={(e) => onSubmitHandler(e)}>
                        <h1 style={{ margin: "1rem 0" }}>EDIT PRODUCT</h1>
                        <div className="row mb-4">
                            <div className="col">
                                <div className="form-outline">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <label className="form-label">Name</label>
                                </div>
                            </div>
                        </div>


                        <div className="form-outline mb-4">
                            <input
                                type="text"
                                className="form-control"
                                name="brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                            <label className="form-label">Brand</label>
                        </div>
                        <div className="form-outline mb-4">
                            <input
                                type="text"
                                className="form-control"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <label className="form-label">Descriptin</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input
                                type="text"
                                className="form-control"
                                name="countInStock"
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            />
                            <label className="form-label">countInStock</label>
                        </div>
                        <div className="form-outline mb-4">
                            <input
                                className="form-control" type="text"
                                name="image"
                                value={image}
                                // onChange={uploadImageHandler}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <input
                                className="form-control mt-2" type="file"
                                name="image"
                                onChange={(e) => uploadImageHandler(e)}
                            />

                            <label className="form-label">image</label>
                        </div>


                        <div className="form-outline mb-4">
                            <input
                                type="text"
                                className="form-control"
                                name="price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <label className="form-label">price</label>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-4">
                            Update Product
                        </button>

                    </form>
                </>}
        </FormContainer>
    );
};
