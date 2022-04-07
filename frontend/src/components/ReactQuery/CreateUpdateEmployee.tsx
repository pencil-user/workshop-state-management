import { Formik, Form } from "formik";
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Employee, SubmitEmployee } from "../../types/types";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery, useQueryClient, QueryKey } from 'react-query';
import axios from "axios";

const validationSchema = yup.object({
  Name: yup
    .string()
    .trim()
    .min(4, 'At least four characters')
    .required('Enter employee name'),
  Email: yup
    .string()
    .trim()
    .email('Enter a valid email')
    .required('Email is required'),
  Phone: yup
    .string()
    .trim()
    .min(6, 'At least six characters')
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/, 'Enter a valid phone')
    .required('Enter a phone')
})

const initialValues = {
  Name: '',
  Email: '',
  Phone: ''
}

const updateEmployees = async (employee: Employee) => {
  const response = (await axios.put<SubmitEmployee>(`http://127.0.0.1:3001/api/employees/${employee.id}`,
    {
      Name: employee.Name,
      Email: employee.Email,
      Phone: employee.Phone
    }
  )).data
  return response
}

export function CreateUpdateEmployee({ action, employee = null }: { action: 'update' | 'create', employee?: null | Employee }) {
  const history = useHistory();
  const queryClient = useQueryClient()
  const updateMutation = useMutation(
    updateEmployees,
    {
      onMutate: () => queryClient.cancelMutations(),
      onSettled: () => queryClient.invalidateQueries()
    })

  return (
    <div className='divider'>
      <Formik
        initialValues={employee || initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log('submit clicked')
          await updateMutation.mutateAsync({ id: (employee as Employee).id, ...values })
          history.goBack();
        }}
        validateOnMount
      >
        {(Formik) =>
          <div>
            <Form>
              <div>
                <div>Name</div>
                <input
                  type='text'
                  minLength={4}
                  name="Name"
                  id="Name"
                  value={Formik.values.Name}
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                />
              </div>
              <div>
                <div>Phone</div>
                <input
                  type="text"
                  minLength={6}
                  name="Phone"
                  id="Phone"
                  value={Formik.values.Phone}
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                />
              </div>
              <div>
                <div>Email</div>
                <input
                  type='email'
                  name="Email"
                  id="Email"
                  value={Formik.values.Email}
                  onChange={Formik.handleChange}
                  onBlur={Formik.handleBlur}
                />
              </div>
              <div>
                {updateMutation.isLoading ?
                  <>
                    Sending...
                  </>
                  :
                  <>
                    <button type="submit" disabled={!Formik.isValid}>Submit</button>
                    <button type="button" onClick={() => history.goBack()} >Cancel</button>
                  </>}
              </div>
            </Form>
          </div>}
      </Formik>
    </div>)
}