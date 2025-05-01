import React, { useCallback, useEffect } from 'react'
import PostList from '../components/PostList'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, fetchPosts } from '../store/postSlice';
import Loading from '../components/Loading';

const Index = () => {
    const dispatch = useDispatch();
    // is in this section it will define state in store and select the posts from exist info or what?
    const {records , loading , error} = useSelector((state) => state.posts);
    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchPosts());
    },[dispatch]);

    const deleteRecord = useCallback(
        (id) => dispatch(deletePost(id)),
        [dispatch]
    );

    return (
        // High Order Component - HOC
        // the modular way if using Hooks!
        <Loading loading={loading} error={error}>
            <PostList isLoggedIn={isLoggedIn} data={records} deleteRecord={deleteRecord} /> {/* as a children  */}
        </Loading>
    )
}

export default Index