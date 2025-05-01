// you needed to classify default component firstly then additional sections through importing operations...
import usePostDetails from "../hooks/user-post-details";
import Loading from "../components/Loading"
import withGuard from "../util/withGuard";

//  additional sections that i mean
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editPost } from "../store/postSlice";
import { useNavigate } from "react-router-dom";
import { postSchema } from "../util/validationSchema";
import { useFormik } from 'formik';

const Edit = () => {
  const { loading:loadingSection , error:errorSection , record } = usePostDetails();
  const dispatch = useDispatch();
  const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
          // to avoid re-evaluation by this way : record ? record?.title : ""
          title: record ? record?.title : "",
          description: record ? record?.description : "",
        },
        enableReinitialize: true, // for what?
        validationSchema:postSchema,
        onSubmit: values => {
          dispatch(editPost({id: record.id, title: values.title, description: values.description}))
          .unwrap().then(() => navigate("/")).catch((error) => {
            console.error("Error when you user navigate into another page: ",error.message);
          })
        },
    });
  
  
  return (
    <div>
      <Loading loading={loadingSection} error={errorSection}>
          <Form onSubmit={formik.handleSubmit}>
              <Form.Group className="mb-3" controlId="exampleFormControlInput1">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                  name="title"
                  type="text"
                  placeholder="javascript"
                  isInvalid={!!formik.errors.title}
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  />
                  <Form.Control.Feedback type="invalid"> {formik.errors.title} </Form.Control.Feedback>

              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleFormControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  as="textarea" rows={3}
                  placeholder="JS is programming language..." 
                  isInvalid={!!formik.errors.description}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  />
                <Form.Control.Feedback type="invalid"> {formik.errors.description} </Form.Control.Feedback>
              </Form.Group>

              <Loading loading={loadingSection} error={errorSection}>
                <button type="submit" className="btn btn-primary">Submit</button>
              </Loading>
          </Form>
      </Loading>
    </div>
  )
}

export default withGuard(Edit)