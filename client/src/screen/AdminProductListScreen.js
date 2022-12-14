// useEffect
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux";
// Link
// useCallback
import { Table } from "react-bootstrap";
import {
    Row, Col,
    Button,
    ListGroup,
    Form,
    Container,
} from "react-bootstrap";
import Message from "../component/Message";
import { adminUserGetApi } from "../component/slice/adminUserGetSlice";
import Loader from "../component/Loader";
// productList
import { useCallback, useEffect } from "react";
import { productList } from "../component/slice/productSlice";
import { Link, Outlet, useNavigate } from "react-router-dom";
// import { adminUserDeleteApi } from "../component/slice/adminUserDeleteSlice";
import { adminGetProductByIdApi } from "../component/slice/adminProductsSlice";
// adminCreateProductsApi
import { productFilterById } from "../component/slice/productFilterSlice";
import { adminCreateProductsApi, resetAdminCreateProduct } from "../component/slice/adminCreateProductSlice";
export const AdminProductListScreen = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const { product, isLoading, isError } = useSelector((p) => p.productList)
    const { isSuccess } = useSelector((p) => p.adminProduct)

    const { isSuccess: successOfCreateProduct, newCreatedproduct } = useSelector((p) => p.productCreate)
    console.log(newCreatedproduct.data, "created product")
    const { userInfo } = useSelector((p) => p.loginUser)
    useEffect(() => {
        dispatch(resetAdminCreateProduct());
        if (!userInfo.isAdmin) {
            navigation('/login')

        }

        if (successOfCreateProduct) {
            navigation(`/admin/product/${newCreatedproduct.data._id}/edit`)

        } else {
            dispatch(productList())

        }
    }, [dispatch, successOfCreateProduct, isSuccess, navigation, userInfo])
    const onDeleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this product")) {
            dispatch(adminGetProductByIdApi(id))
            console.log(id)
        }
    }
    const createProductHandler = useCallback(() => {
        dispatch(adminCreateProductsApi())

    }, [dispatch])


    return (
        <div>
            <Row className="align-items-center">
                <Col>
                    <h1>PRODUCTS</h1>
                </Col>
                <Col className="text-right">

                    <Button className="btn btn-primary" onClick={createProductHandler} > <i className="fas fa-plus"></i> CREATE PRODUCT </Button>
                </Col>
            </Row>
            {isLoading ? <Loader /> : isError ? <Message variant="danger">{isError}</Message> :
                (

                    <Table striped responsive hover bordered className="table-sm">
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>NAME</td>
                                <td>PRICE</td>
                                <td>CATEGORY</td>
                                <td>BRAND</td>
                                <td>UPDATE</td>
                                <td>DELETE</td>
                            </tr>
                        </thead>

                        <tbody>
                            {product.map((users) => (

                                <tr key={users._id}>
                                    <td>{users._id}</td>
                                    <td>{users.name}</td>
                                    <td >

                                        {users.price} </td>
                                    {/* <td>{users.admin}</td> */}
                                    <td> {users.category} </td>
                                    <td>{users.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${users._id}/edit`}>
                                            <Button className="btn-sm ml-3" variant="light">
                                                <i className="fas fa-edit" style={{ color: "green" }}></i>
                                            </Button>
                                        </LinkContainer>

                                    </td>
                                    <td>
                                        <Button className="btn-sm ml-3" variant="light" onClick={() => onDeleteHandler(users._id)}>
                                            <i className="fas fa-trash" style={{ color: "red" }}></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                )

            }

        </div>
    )
}
