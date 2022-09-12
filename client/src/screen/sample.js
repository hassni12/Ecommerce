
            {/* {isLoading ? <Loader /> : isError ? <Message variant="danger">{isError}</Message> :
                (
                    <Table striped responsive hover bordered className="table-sm">
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>NAME</td>
                                <td>EMAIL</td>
                                <td>ADMIN</td>
                                <td></td>
                            </tr>
                        </thead>

                        <tbody>
                            {AllUsers.map((users) => (
                                <tr key={users._id}>
                                    <td>{users._id}</td>
                                    <td>{users.name}</td>
                                    <td ><Link to={`mailto:${users.email}`}>

                                        {users.email} </Link></td>
                                    <td>{users.admin}</td>
                                    <td>  {users.isAdmin ? (<i className="fas fa-times" style={{ color: "red" }}></i>) : (<i className="fas fa-check" style={{ color: "green" }}></i>)}</td>
                                    <td>
                                        <LinkContainer to={`/user/${users._id}/edit`}>
                                            <Button className="btn-sm btn-block">
                                                <i className="fas fa-edit" style={{ color: "green" }}></i>


                                            </Button>
                                        </LinkContainer>
                                        <Button className="btn-sm btn-block" onClick={() => onDeleteHandler(users._id)}>
                                            <i className="fas fa-trash" style={{ color: "red" }}></i>


                                        </Button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                )

            } */}