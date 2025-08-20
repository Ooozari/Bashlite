// validations/index.js
import * as Yup from 'yup';

// USER
export const EditProfileSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address').required('Email is required'),
  username: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(20, 'Maximum 20 characters').required('Username is required'),
  avatar: Yup.string()
    .required("Image is required")
});


// FAVROUTIES
export const AddMovieSchema = Yup.object({
  movie: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(20, 'Maximum 20 characters').required('Movie name is required'),
});
export const AddBookSchema = Yup.object({
  book: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(20, 'Maximum 20 characters').required('Book name is required'),
});


// PRODUCTS
export const EditProductSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Minimum 3 characters')
    .required('Name is required'),

  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be positive')
    .required('Price is required'),

  category: Yup.string()
    .min(3, 'Minimum 3 characters')
    .required('Category is required'),
  imageURL: Yup.string()
    .required("Image is required")
});
export const AddProductSchema = Yup.object({
  name: Yup.string()
    .min(3, 'Minimum 3 characters')
    .required('Name is required'),

  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be positive')
    .required('Price is required'),

  category: Yup.string()
    .min(3, 'Minimum 3 characters')
    .required('Category is required'),
  imageURL: Yup.string().required("Image is required")
});



// BLOGS
export const AddBlogSchema = Yup.object({
  title: Yup.string()
    .max(150, 'Maximum 150 characters')
    .required('Title is required'),
  content: Yup.string()
    .required('Content is required'),
  author: Yup.string()
    .required('Author name is required'),
});
export const UpdateBlogSchema = Yup.object({
  title: Yup.string()
    .max(150, 'Maximum 150 characters')
    .required('Title is required'),
  content: Yup.string()
    .required('Content is required'),
});
