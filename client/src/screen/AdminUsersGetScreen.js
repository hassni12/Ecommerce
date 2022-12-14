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
import { useEffect } from "react";
import { productList } from "../component/slice/productSlice";
import { Link, useNavigate } from "react-router-dom";
import { adminUserDeleteApi } from "../component/slice/adminUserDeleteSlice";
// useNavigate
// adminUserDeleteApi
export const AdminUsersGetScreen = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((p) => p.loginUser)
    console.log(userInfo);
    const { isSuccess } = useSelector((p) => p.deletedUsers)
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(adminUserGetApi())
        } else {
            navigation('/login')
        }

    }

        , [dispatch,isSuccess,userInfo,navigation])
    const usersList = useSelector((p) => p.adminUsersList)


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
            <h1>USERS</h1>
            {isLoading ? <Loader /> : isError ? <Message variant="danger">{isError}</Message> :
                (
                    <Table striped responsive hover bordered className="table-sm">
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>NAME</td>
                                <td>EMAIL</td>
                                <td>ADMIN</td>
                                <td>UPDATE</td>
                                <td>DELETE</td>
                            </tr>
                        </thead>

                        <tbody>
                            {AllUsers.map((users) => (
                                <tr key={users._id}>
                                    <td>{users._id}</td>
                                    <td>{users.name}</td>
                                    <td ><Link to={`mailto:${users.email}`}>

                                        {users.email} </Link></td>
                                    {/* <td>{users.admin}</td> */}
                                    <td>  {users.isAdmin ? (<i className="fas fa-check" style={{ color: "green" }}></i>) : (<i className="fas fa-times" style={{ color: "red" }}></i>)}</td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${users._id}/edit`}>
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
