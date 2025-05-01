import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {

  const navigate = useNavigate(); // that used to return back -> into main page
  // replace : true to avoid return into error page when you exit from it!

  return (
    <div className='w-100 min-vh-100 d-flex justify-content-center align-items-center flex-column'>
        <img src='../ErrorPage.png' alt="Page Not Found!" className='errorImage' />
        <button type="button" className="btn btn-link text-capitalize" onClick={() => navigate("/", {replace:true})}>return back</button>
    </div>
  )
}

export default ErrorPage