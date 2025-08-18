'use client';

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from 'formik';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Heading, Paragraph } from '@/components/ui/typography'
import Image from 'next/image'
import { User, Pencil, X } from 'lucide-react';
import avatarUrl from "@/assets/pic.jpg"
import { addFavorites, removeFavorites,removeAllFavorites } from "@/features/userPreferencesSlice"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription
} from "@/components/ui/dialog";
import { ErrorMessage } from '@/components/shared'
import { EditProfileSchema, AddMovieSchema, AddBookSchema } from '@/validations';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { updateProfile, } from "@/features/userPreferencesSlice";

function UserPreferences() {
    const dispatch = useDispatch();
    const userPreferences = useSelector((state) => state.userPreferences);
    console.log("userPreferences", userPreferences);
    const [preview, setPreview] = useState(userPreferences.avatar)
    const [openEditProfileDialog, setopenEditProfileDialog] = useState(false);
    const [openAddMovieDialog, setopenAddMovieDialog] = useState(false);
    const [openAddBookDialog, setopenAddBookDialog] = useState(false);
    const [openConfirmResetDialog, setopenConfirmResetDialog] = useState(false);


    const editProfileFormik = useFormik({
        initialValues: {
            username: userPreferences.username,
            email: userPreferences.email,
            avatar: userPreferences.avatar,
        },
        validationSchema: EditProfileSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            const avatarUrl = values.avatar instanceof File
                ? URL.createObjectURL(values.avatar)
                : values.avatar;
            dispatch(updateProfile({
                username: values.username,
                email: values.email,
                avatar: values.avatar
            }));
            setopenEditProfileDialog(false);
        },

    });

    const addMovieFormik = useFormik({
        initialValues: {
            movie: "",
        },
        validationSchema: AddMovieSchema,
        onSubmit: (values, { resetForm }) => {
            dispatch(
                addFavorites({
                    category: "movies",
                    item: values.movie,
                })
            );
            resetForm();
            setopenAddMovieDialog(false)
        },
    });

    const movies = useSelector((state) => state.userPreferences.favorites.movies);
    const addBookFormik = useFormik({
        initialValues: {
            book: "",
        },
        validationSchema: AddBookSchema,
        onSubmit: (values,{ resetForm }) => {
            dispatch(
                addFavorites({
                    category: "books",
                    item: values.book,
                })
            );
            resetForm();
            setopenAddBookDialog(false)
        },
    });
    const books = useSelector((state) => state.userPreferences.favorites.books);

    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // store base64 string inside formik
                editProfileFormik.setFieldValue("avatar", reader.result);
                setPreview(reader.result); // for preview
            };
            reader.readAsDataURL(file); // convert to base64
        }
    };

    return (
        <>

            {/* heading */}
            {/* <div className='px-[20px]'>
                <Heading level='pageheading' className="font-[700] text-dark font-roboto">User Preferences</Heading>
            </div> */}
            {/* section */}
            <div className='flex flex-col gap-10  max-w-full px-10'>
                {/* Profile section */}
                <div className='flex items-center justify-between'>

                    {/* Avatar and Name */}
                    <div className='flex items-center gap-4'>
                        {/* Avtar */}
                        {preview && preview !== "" ? (<div className='w-14 h-14 sm:w-[60px] sm:h-[60px] md:w-[64px] md:h-[64px] lg:w-[68px] lg:h-[68px] xl:w-[70px] xl:h-[70px] 2xl:w-18 2xl:h-18'>
                            <img
                                src={userPreferences.avatar}
                                alt="user avatar"
                                className="object-cover w-full h-full rounded-[4px]"
                            />
                        </div>) : (<div className='w-14 h-14 sm:w-[60px] sm:h-[60px] md:w-[64px] md:h-[64px] lg:w-[68px] lg:h-[68px] xl:w-[70px] xl:h-[70px] 2xl:w-18 2xl:h-18 bg-red-100'>
                            <User className="w-5 h-5 text-gray-400" />
                        </div>)}

                        <div>
                            <Heading level="medium" className="font-[700] text-dark">{userPreferences.username}</Heading>
                            <Paragraph size='medium' className="font-[500] text-light">{userPreferences.email}</Paragraph>
                        </div>

                    </div>

                    {/* Edit profile button */}
                    <div>
                        <Button onClick={() => setopenEditProfileDialog(true)}>
                            <Paragraph size="btntext" className="flex items-center gap-1">
                                <span><Pencil /></span>
                                <span>Edit profile</span>
                            </Paragraph>
                        </Button>
                    </div>
                </div>

                <div className='flex flex-col gap-[20px] mb-[100px]'>
                    {/* themeSetting */}
                    <div className="border bg-primary-card-bg  rounded-[4px] px-6 pt-[17px] pb-4 flex flex-col gap-[20px]">
                        <div>
                            <Heading
                                className="text-dark font-[600] font-roboto relative pb-2"
                                level="sectionheading"
                            >
                                Theme Setting
                            </Heading>
                            <div className="w-full h-[1px] bg-primary rounded"></div>
                        </div>

                        <div className='flex flex-col gap-[20px] md:gap-[10px]'>
                            <div className='flex flex-col md:flex-row gap-2 justify-between md:items-center'>
                                <div className='flex flex-col'>
                                    <Heading level='normal' className="text-dark font-[700]">Mode</Heading>
                                    <Paragraph size='normal' className="font-[500] text-light" >Choose between Light, Dark, or System default appearance.</Paragraph>
                                </div>

                                <Select>
                                    <SelectTrigger className="w-full md:w-[180px]">
                                        <SelectValue placeholder="Select theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='flex flex-col md:flex-row gap-2 justify-between md:items-center'>
                                <div className='flex flex-col'>
                                    <Heading level='normal' className="text-dark font-[700]">Color scheme</Heading>
                                    <Paragraph size='normal' className="font-[500] text-light">Pick your preferred accent color to personalize the interface.</Paragraph>
                                </div>

                                {/* Theme color preview blocks */}
                                <Select>
                                    <SelectTrigger className="w-full md:w-[180px]">
                                        <SelectValue placeholder="Select scheme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="purple"><div className="flex items-center gap-1">
                                            <div className="w-5 h-5 rounded bg-[#816bff]" />
                                            <Paragraph size="sm">Purple</Paragraph>
                                        </div></SelectItem>
                                        <SelectItem value="blue"><div className="flex items-center gap-1">
                                            <div className="w-5 h-5 rounded bg-[#3B82F6]" />
                                            <Paragraph size="sm">Blue</Paragraph>
                                        </div>
                                        </SelectItem>
                                        <SelectItem value="green"><div className="flex items-center gap-1">
                                            <div className="w-5 h-5 rounded bg-[#22C55E]" />
                                            <Paragraph size="sm">Green</Paragraph>
                                        </div></SelectItem>
                                    </SelectContent>
                                </Select>

                            </div>
                        </div>

                    </div>
                    {/* Favorite items list */}
                    <div className="border bg-primary-card-bg  rounded-[4px] px-6 pt-[17px] pb-4 flex flex-col gap-[20px]">
                        <div className="">
                            <Heading
                                className="text-dark font-[600] font-roboto relative pb-2"
                                level="sectionheading"
                            >
                                Favorite items
                            </Heading>
                            <div className="w-full h-[1px] bg-primary rounded"></div>
                        </div>

                        <div className='flex flex-col gap-[20px] md:gap-[10px]'>
                            {/* movies */}
                            <div className='flex flex-col md:flex-row gap-2 justify-between md:items-center'>
                                <div className='flex flex-col gap-[8px]'>
                                    <Heading level='medium' className="text-dark font-[700]">Movies</Heading>
                                    <Paragraph size='sm' className="flex gap-1 flex-wrap">
                                        {movies && movies.length > 0 ? (
                                            movies.map((movies, index) => (
                                                <span
                                                    key={index}
                                                    className='flex gap-1 items-center font-[500] text-primary border border-primary px-2 py-1 rounded-[6px]'>{movies} <X onClick={() =>
                                                        dispatch(
                                                            removeFavorites({
                                                                category: "movies",
                                                                item: movies,
                                                            })
                                                        )
                                                    }
                                                        className="size-3 cursor-pointer" /></span>
                                            )
                                            )
                                        ) : (<Paragraph size="normal" className='font-[500] text-light'>No movies found</Paragraph>)}

                                    </Paragraph>
                                </div>
                                <div className='flex gap-2'>
                                    <Button 
                                    onClick={()=> (dispatch(removeAllFavorites({ category: "movies",})))}
                                     className="hover:bg-destructive/10 text-destructive hover:text-destructive h-8 px-1" variant="ghost">
                                        <Paragraph size="btntext" className='font-bold'>
                                            Delete
                                        </Paragraph>
                                    </Button>
                                    <Button className="hover:bg-primary/10 text-primary hover:text-primary px-1" variant="ghost" onClick={() => (setopenAddMovieDialog(true))}>
                                        <Paragraph size="btntext" className="font-bold">
                                            + Add
                                        </Paragraph>
                                    </Button>
                                </div>

                            </div>
                            {/* books */}
                            <div className='flex flex-col md:flex-row gap-2 justify-between md:items-center'>
                                <div className='flex flex-col gap-[8px]'>
                                    <Heading level='medium' className="text-dark font-[700]">Books</Heading>
                                    <Paragraph size='sm' className="flex gap-1 flex-wrap">
                                        {books && books.length > 0 ? (
                                            books.map((book, index) => (
                                                <span
                                                    key={index}
                                                    className='flex gap-1 items-center font-[500] text-primary border border-primary px-2 py-1 rounded-[6px]'>{book} <X onClick={() =>
                                                        dispatch(
                                                            removeFavorites({
                                                                category: "books",
                                                                item: book,
                                                            })
                                                        )
                                                    }
                                                        className="size-3 cursor-pointer" /></span>
                                            )
                                            )
                                        ) : (<Paragraph size="normal" className='font-[500] text-light'>No book found</Paragraph>)}

                                    </Paragraph>
                                </div>
                                <div className='flex gap-2'>
                                    <Button 
                                    onClick={()=> (dispatch(removeAllFavorites({ category: "books",})))}
                                    className="hover:bg-destructive/10 text-destructive hover:text-destructive h-8 px-1" variant="ghost">
                                        <Paragraph size="btntext" className="font-[700]">
                                            Delete
                                        </Paragraph>
                                    </Button>
                                    <Button className="hover:bg-primary/10 text-primary hover:text-primary px-1 " variant="ghost" onClick={() => (setopenAddBookDialog(true))}>
                                        <Paragraph size="btntext" className="font-[700]">
                                            + Add
                                        </Paragraph>
                                    </Button>
                                </div>

                            </div>
                        </div>

                    </div>
                    {/* Reset all local storage data */}
                    <div className="border bg-destructive/5 rounded-[4px] px-6 pt-[17px] pb-4 flex flex-col gap-[20px]">
                        <div className="relative inline">
                            <Heading
                                className="text-destructive font-[600] font-roboto relative pb-2"
                                level="sectionheading"
                            >
                                Reset Data
                            </Heading>
                            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-destructive rounded"></span>
                        </div>

                        <div className='flex flex-col gap-[20px] md:gap-[10px]'>
                            <div className='flex flex-col md:flex-row gap-2 justify-between md:items-center'>
                                <div className='flex flex-col'>
                                    <Heading level='normal' className="text-dark font-[700]">Clear Local Storage</Heading>
                                    <Paragraph size='normal' className="font-[500] text-light">Permanently remove all saved preferences, products, and blogs from local storage. This action cannot be undone.</Paragraph>
                                </div>
                                <Button className="" variant="destructive" onClick={() => (setopenConfirmResetDialog(true))}>
                                    <Paragraph size="btntext" className="font-[700]">
                                        Reset All Data
                                    </Paragraph>
                                </Button>

                            </div>

                        </div>

                    </div>
                </div>
            </div>

            {/* Edit Profile*/}
            <Dialog open={openEditProfileDialog} onOpenChange={setopenEditProfileDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-start">Update Profile Information</DialogTitle>
                        <DialogDescription>Modify your profile picture, email, and username details below.</DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={editProfileFormik.handleSubmit}
                        className="grid gap-6"
                    >
                        <div className='flex gap-6 items-center'>
                            {/* Profile Picture Field */}
                            <div className='w-14 h-14 sm:w-[60px] sm:h-[60px] md:w-[64px] md:h-[64px] lg:w-[68px] lg:h-[68px] xl:w-[70px] xl:h-[70px] 2xl:w-18 2xl:h-18 relative'>
                                <Image
                                    src={editProfileFormik.values.avatar || avatarUrl}
                                    alt="user avatar"
                                    fill
                                    className="object-cover w-full h-full rounded-[4px]"
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <Label htmlFor="avatar">
                                    <Paragraph size="label">Profile Picture</Paragraph>
                                </Label>
                                <div className='relative'>
                                    <Input
                                        id="avatar"
                                        name="avatar"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    <ErrorMessage
                                        error={editProfileFormik.errors.avatar}
                                        touched={editProfileFormik.touched.avatar}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="email">
                                <Paragraph size="label">Email</Paragraph>
                            </Label>

                            <div className="relative">
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={editProfileFormik.values.email}
                                    onChange={editProfileFormik.handleChange}
                                    onBlur={editProfileFormik.handleBlur}
                                    className="w-full"
                                />
                                {editProfileFormik.touched.email && editProfileFormik.errors.email && (
                                    <ErrorMessage
                                        error={editProfileFormik.errors.email}
                                        touched={editProfileFormik.touched.email}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="username">
                                <Paragraph size="label">Username</Paragraph>
                            </Label>

                            <div className="relative">
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="Enter new username"
                                    value={editProfileFormik.values.username}
                                    onChange={editProfileFormik.handleChange}
                                    onBlur={editProfileFormik.handleBlur}
                                    className="w-full"
                                />
                                {editProfileFormik.touched.username && editProfileFormik.errors.username && (
                                    <ErrorMessage
                                        error={editProfileFormik.errors.username}
                                        touched={editProfileFormik.touched.username}
                                    />
                                )}
                            </div>
                        </div>
                        <Button type="submit" className="w-full">
                            <Paragraph size="btntext">Update Profile</Paragraph>
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            {/*Add movie*/}
            <Dialog open={openAddMovieDialog} onOpenChange={setopenAddMovieDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-start">Add a New Movie</DialogTitle>
                        <DialogDescription>Enter the movie name below to add it to your favorites list.</DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={addMovieFormik.handleSubmit}
                        className="grid gap-6"
                    >
                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="movie">
                                <Paragraph size="label">Movie name</Paragraph>
                            </Label>

                            <div className="relative">
                                <Input
                                    id="movie"
                                    name="movie"
                                    placeholder="Enter movie name"
                                    value={addMovieFormik.values.movie}
                                    onChange={addMovieFormik.handleChange}
                                    onBlur={addMovieFormik.handleBlur}
                                    className="w-full"
                                />
                                {addMovieFormik.touched.movie && addMovieFormik.errors.movie && (
                                    <ErrorMessage
                                        error={addMovieFormik.errors.movie}
                                        touched={addMovieFormik.touched.movie}
                                    />
                                )}
                            </div>
                        </div>
                        <Button type="submit" className="w-full">
                            <Paragraph size="btntext">Add movie</Paragraph>
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            {/*Add book*/}
            <Dialog open={openAddBookDialog} onOpenChange={setopenAddBookDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-start">Add a New Book</DialogTitle>
                        <DialogDescription>Enter the book name below to add it to your favorites list.</DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={addBookFormik.handleSubmit}
                        className="grid gap-6"
                    >
                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="book">
                                <Paragraph size="label">Book name</Paragraph>
                            </Label>

                            <div className="relative">
                                <Input
                                    id="book"
                                    name="book"
                                    placeholder="Enter book name"
                                    value={addBookFormik.values.book}
                                    onChange={addBookFormik.handleChange}
                                    onBlur={addBookFormik.handleBlur}
                                    className="w-full"
                                />
                                {addBookFormik.touched.book && addBookFormik.errors.book && (
                                    <ErrorMessage
                                        error={addBookFormik.errors.book}
                                        touched={addBookFormik.touched.book}
                                    />
                                )}
                            </div>
                        </div>
                        <Button type="submit" className="w-full">
                            <Paragraph size="btntext">Add book</Paragraph>
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Are you sure you want to reset? */}
            <Dialog open={openConfirmResetDialog} onOpenChange={setopenConfirmResetDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className='text-start'>Confirm Data Reset</DialogTitle>
                        <DialogDescription className='font-urbanist text-start text-[12px] md:text-[13px] lg:text-[14px] xl:text-[14px] 2xl:text-[16px]'>
                            This action will permanently clear all saved preferences, products, and blogs from local storage. This cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className='w-full'>
                        <div className='w-full'>
                            <Button
                                variant='destructive'
                                className='w-full'
                                onClick={() => setopenConfirmResetDialog(false)}
                            >
                                <Paragraph size="btntext">Take Me Back</Paragraph>
                            </Button>
                        </div>
                        <div className='w-full'>
                            <Button
                                className='w-full'
                            >
                                <Paragraph size="btntext">Yes, Reset</Paragraph>
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )

}

export default UserPreferences
