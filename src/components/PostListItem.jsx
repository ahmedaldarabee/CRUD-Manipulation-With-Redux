import { Button, ButtonGroup } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PostListItem = ({ data, deleteRecord , isLoggedIn }) => {
    const navigate = useNavigate();

    const deleteRecordFn = (record) => {  // Pass id as a parameter
    
        Swal.fire({
            title: "Are you sure?",
            text: `You wont be delete this item: ${record.title}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: `${record.title} content deleted successfully!`,
                    icon: "success"
                });
                deleteRecord(record.id); // Pass id to delete function
                dispatch(fetchPosts());
            }
            window.location.reload();
        });
    };

    const allRecords = data.map((record, index) => (
        <tr key={record.id}>
            <td>{++index}</td>
            <td><Link to={`post/${record.id}`} > {record.title} </Link></td>
            <td>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="success" onClick={() => navigate(`post/${record.id}/edit`)}>Edit</Button>
                    {/*
                        after we manage edit-page, now we needed to manage delete button when user not logged-in
                        disabled={!isLoggedIn}
                    */}
                    <Button variant="danger" onClick={() => deleteRecordFn(record)} disabled={!isLoggedIn}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    ));

    return <>{allRecords}</>;
};

export default PostListItem;
