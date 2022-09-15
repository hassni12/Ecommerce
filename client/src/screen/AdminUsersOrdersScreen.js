// useEffect
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux";
// Link
import { Table } from "react-bootstrap";
import {

    Button,
    ListGroup,
    Form,
    Container,
} from "react-bootstrap";
import Message from "../component/Message";
import { adminUserGetApi } from "../component/slice/adminUserGetSlice";
import Loader from "../component/Loader";
// productList
// adminGetUsersOrderApi
// adminGetUsersOrderApi
import {adminGetUsersOrderApi} from "../component/slice/adminGetUsersOrderSlice"
import { useEffect } from "react";
import { productList } from "../component/slice/productSlice";
import { Link, useNavigate } from "react-router-dom";
import { adminUserDeleteApi } from "../component/slice/adminUserDeleteSlice";
// import { adminGetUsersOrderApi } from "../component/slice/adminGetUsersOrderSlice";
export const AdminUsersOrdersScreen = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((p) => p.loginUser)
    console.log(userInfo);
    const { isSuccess } = useSelector((p) => p.deletedUsers)
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(adminGetUsersOrderApi())
        } else {
            navigation('/login')
        }

    }

        , [dispatch,isSuccess,userInfo,navigation])
    const usersList = useSelector((p) => p.adminUsersList)
    const {isLoading:isLoadingOrderList,isSuccess:isSuccessOrderList,userOrder} = useSelector((p) => p.orderList)

    const { isError, isLoading, users: AllUsers } = usersList;
    console.log(AllUsers)

    const onDeleteHandler = (id) => {
       if( window.confirm("Are you sure you want to delete this user")){
            dispatch(adminUserDeleteApi(id))
        }
        // dispatch(adminUserDeleteApi({ id }))
        // navigation(`/admin/userslist`)

    }



    return (
        <div>
            <h1>ORDERS</h1>
            {isLoading ? <Loader /> : isError ? <Message variant="danger">{isError}</Message> :
                (
                    <Table striped responsive hover bordered className="table-sm">
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>USER</td>
                                <td>DATE</td>
                                <td>TOTAL</td>
                                <td>PAID</td>
                                <td>DELIVERED</td>
                                <td>DETAILS</td>

                            </tr>
                        </thead>

                        <tbody>
                            {userOrder.map((users) => (
                                <tr key={users._id}>
                                    <td>{users._id}</td>
                                    <td>{users.userId.name}</td>
                                    <td >{(users.createdAt)}</td>
                                    {/* <td>{users.admin}</td> */}
                                    <td> {users.totalPrice}</td>
                                    <td>{users.isPaid ? (<i className="fas fa-check" style={{ color: "green" }}></i>) : (<i className="fas fa-times" style={{ color: "red" }}></i>)}
                                        
                                    </td>
                                    <td>{users.isDelivered ? (<i className="fas fa-check" style={{ color: "green" }}></i>) : (<i className="fas fa-times" style={{ color: "red" }}></i>)}
                                        
                                    </td>
                                    <td>
                                    <LinkContainer to={`/order/${users._id}`}>
                                            <Button className="btn-sm btn-block" variant="light">
                                                DETAILS
                                                {/* <i className="fas fa-edit" style={{ color: "green" }}></i> */}
                                            </Button>
                                        </LinkContainer>
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
