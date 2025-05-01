import { memo } from "react";
import { Table } from "react-bootstrap";
import PostListItem from "./PostListItem";

const PostList = ({ data, deleteRecord ,isLoggedIn}) => {
    return (
        data.length === 0 ? (
        <>
            <div className="text-center pointer d-flex justify-content-center align-items-center flex-column gap-2">
                
                <p>Welcome in <b>crud web application</b>, please log-in to add posts and manage it!</p>
                <picture>
                    <source srcSet={"./loginPana.webp"} type="image/webp" />
                    <img width={350} height={350} loading="lazy" src={"./loginPana.webp"} alt="Log in message" />
                </picture>         
            </div>
        </>) :
            (<>
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th style={{ width: "70%" }}>Title</th>
                        <th style={{ width: "10%" }}>Operations</th>
                    </tr>
                </thead>

                <tbody>
                    <PostListItem data={data} deleteRecord={deleteRecord} isLoggedIn={isLoggedIn}/>
                </tbody>
            </Table>
            </>)
    );
};

export default memo(PostList);