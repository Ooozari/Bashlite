// validations/index.js
import * as Yup from 'yup';

export const EditProfileSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address').required('Email is required'),
  username: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(20, 'Maximum 20 characters').required('Username is required'),
  profilePicture: Yup.mixed()
    .nullable() // optional field
    .test(
      "fileSize",
      "File too large. Max 2MB",
      value => !value || (value && value.size <= 2 * 1024 * 1024)
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      value => !value || (value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type))
    ),
});
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
