import usePostDetails from '../hooks/user-post-details'
import Loading from '../components/Loading'

const Details = () => {
    const { loading , error , record } = usePostDetails();

    return (
        <div>
            <Loading loading={loading} error={error}>
                <p className='text-center fw-bold'> Title : {record?.title} </p>
                <p> Description : {record?.description} </p>
            </Loading>
        </div>
    )
}

export default Details