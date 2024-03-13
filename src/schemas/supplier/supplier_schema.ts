import * as yup from "yup";
export const addEditSupplierSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().optional(),
  email: yup.string().email().optional(),
  tax: yup.string().optional(),
  phone: yup.string().required("Phone is required"),
  openingBalance: yup
    .number()
    .optional()
    .integer()
    .typeError("Opening balance must be a number"),
  advanceAmount: yup
    .number()
    .optional()
    .integer()
    .typeError("Advance amount must be a number"),
  dueAmount: yup
    .number()
    .optional()
    .integer()
    .typeError("Due amount must be a number"),
  peyTerm: yup.string().optional(),
  address: yup.string().optional(),
  branchId: yup.number().required("Branch is required"),
  city: yup.string().optional(),
  state: yup.string().optional(),
  zipCode: yup.string().optional(),
  paidStatus: yup.string().optional(),
});

/**
 const supplierValidation = {
    body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().optional(),
        email: Joi.string().email().required(),
        tax: Joi.string().optional(),
        phone: Joi.string().required(),
        openingBalance: Joi.number().optional(),
        advanceAmount: Joi.number().optional(),
        dueAmount: Joi.number().optional(),
        peyTerm: Joi.string().optional().valid('Months', 'Days'),
        address: Joi.string().optional(),
        city: Joi.string().optional(),
        state: Joi.string().optional(),
        zipCode: Joi.string().optional(),
        branchId: Joi.number().optional(),
        paidStatus: Joi.string().optional().valid('Paid','Due')
})
}
 */
