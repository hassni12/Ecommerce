import React, { useState, useEffect } from "react";
import { FormContainer } from "../component/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { registerUser } from "../component/slice/registerSlice";
import Loader from "../component/Loader";
import Message from "../component/Message";
import { adminUserGetByIdApi ,refreshAdminGetUser,adminUserUpdateByIdApi } from "../component/slice/adminUserGetByIdSlice";
export const AdminUserUpdateScreen = () => {
    const params = useParams();
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)
    const { id } = params;
    console.log(id)
    const { isError, isLoading, user, isSuccess,updateUser } = useSelector((p) => p.getAndUpdateUserInAdmin);
    console.log(user)
    useEffect(() => {
        if(isSuccess){
                dispatch(refreshAdminGetUser( ))
                navigation(`/admin/userslist`)

        }else{

             if (!user.name || user._id !== id) {
            dispatch(adminUserGetByIdApi(id))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
        }
       

    }, [dispatch, id, user,isSuccess]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(adminUserUpdateByIdApi({id,name ,email,isAdmin}))

    };
    return (
        <FormContainer>
            <Link to="/admin/userslist" className="btn btn-primary my-3">Go Back</Link>
            {isError && <Message variant="danger">{isError}</Message>}
            {isLoading && <Loader />}
            {isLoading ? <Loader /> : isError ? <Message variant="danger">{isError}</Message> :
                <>
                    <form onSubmit={(e) => onSubmitHandler(e)}>
                        <h1 style={{ margin: "1rem 0" }}>EDIT USER</h1>
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
                                type="email"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="form-label">Email address</label>
                        </div>

                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                label="Is Admin"
                                // aria-controls=""
                                checked={isAdmin}

                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                            <label className="form-check-label">
                                Is Admin
                            </label>

                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-4">
                            Update User
                        </button>

                    </form>
                </>}
        </FormContainer>
    );
};
