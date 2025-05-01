
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPost } from '../store/postSlice';
import { useParams } from 'react-router-dom';

// Custom-Hook!
// that provided to show data based on sended id
const usePostDetails = (id) => {    

    const {id: asId} = useParams(); // to provide parameters from URL!

    console.log("current id: ", asId);

    const dispatch = useDispatch();
    const { loading , error , record } = useSelector((state) => state.posts);
    
    useEffect(() => {
        dispatch(fetchPost(asId));
    },[dispatch,asId]);
    
    return {loading , error , record};
}

export default usePostDetails