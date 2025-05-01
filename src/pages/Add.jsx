import Loading from "../components/Loading"
import withGuard from '../util/withGuard';

import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { insertPost } from "../store/postSlice"
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { postSchema } from "../util/validationSchema";

const AddPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const {loading,error} = useSelector((state) => state.posts);

   // forms fields
  const formik = useFormik({
      initialValues: {
        title: "",
        description: "",
      },
      validationSchema:postSchema,
      onSubmit: values => {
          const id = Math.floor(Math.random() * 500);
          dispatch(insertPost({id,title: values.title,description: values.description}))
            .unwrap() // the most important method that used to handle wrongs or success operations
            .then(() => {
              navigate("/");
            })
            .catch((error) => {
              console.error("The error be as: ",error);
            })
      },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleFormControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          name="title" // to enable forms to be worked!
          onChange={formik.handleChange}
          value={formik.values.title}
          type="text" placeholder="javascript"
          isInvalid={!!formik.errors.title}
          // !! -> [ casting-method ]  formik.errors.title -> [ string error message ] 
          // that used to know if input have a data or not by true or false with isInvalid method as a completion of error handling method
        />
          <Form.Control.Feedback type="invalid"> {formik.errors.title} </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleFormControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          as="textarea" rows={3} 
          placeholder="JS is programming language..." 
          isInvalid={!!formik.errors.description}
          />
          
          {/* First way to show errors:  */}
            {/* That show error message once accrue */}
            {/* {formik.errors.description && formik.touched.description ? ( <div>{formik.errors.description}</div> ) : null} */}

          {/* Second way to show errors by react-bootstrap */}
          <Form.Control.Feedback type="invalid"> {formik.errors.description} </Form.Control.Feedback>

      </Form.Group>

      <Loading loading={loading} error={error}>
        <button type="submit" className="btn btn-primary">Submit</button>
      </Loading>
    </Form>
  )
}

export default withGuard(AddPost)
