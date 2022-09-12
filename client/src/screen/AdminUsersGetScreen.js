// useEffect
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux";
// Link
import { Table } from "react-bootstrap";
import {
    Row,
    Col,
    Image,
    Card,
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
import { Link } from "react-router-dom";

export const AdminUsersGetScreen = () => {

    const dispatch = useDispatch();
    useEffect(() => {

        dispatch(adminUserGetApi())
    }

        , [dispatch])
    const usersList = useSelector((p) => p.adminUsersList)


    const { isError, isLoading, users: AllUsers } = usersList;
    console.log(AllUsers)

    const onDeleteHandler = () => {

    }
    return (
        <div>
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
                                        <LinkContainer to={`/user/${users._id}/edit`}>
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
