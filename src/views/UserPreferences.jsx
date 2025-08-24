'use client';

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from 'formik';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Heading, Paragraph } from '@/components/ui/typography'
import Image from 'next/image'
import { User2, User, Pencil, X, Palette, BookHeart, CookingPot, History } from 'lucide-react';
import { addFavorites, removeFavorites, removeAllFavorites, resetAllPreferences, updateTheme, updateColorScheme } from "@/features/userPreferencesSlice"
import { clearAllProducts } from '@/features/productsSlice'
import { clearAllBlogs } from '@/features/blogsSlice'

import { setSessionHistory, clearSessionHistory } from '@/features/sessionHistorySlice'
import { toast } from "sonner"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
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
import { fileToBase64 } from '@/utils/fileHelpers';
import { themePalettes } from '@/data/index'




function UserPreferences() {
    const dispatch = useDispatch();
    const userPreferences = useSelector((state) => state.userPreferences);
    const sessions = useSelector((state) => state.sessionHistory);
    console.log("Sessions:", sessions);
    const [openEditProfileDialog, setopenEditProfileDialog] = useState(false);
    const [openAddMovieDialog, setopenAddMovieDialog] = useState(false);
    const [openAddBookDialog, setopenAddBookDialog] = useState(false);
    const [openConfirmResetDialog, setopenConfirmResetDialog] = useState(false);
    const theme = useSelector((state) => state.userPreferences.theme);
    const colorScheme = useSelector((state) => state.userPreferences.colorScheme);

    const editProfileFormik = useFormik({
        initialValues: {
            username: userPreferences.username,
            email: userPreferences.email,
            avatar: userPreferences.avatar,
        },
        validationSchema: EditProfileSchema,
        enableReinitialize: true,
        onSubmit: (values, { resetForm }) => {
            const avatarUrl = values.avatar instanceof File
                ? URL.createObjectURL(values.avatar)
                : values.avatar;
            dispatch(updateProfile({
                username: values.username,
                email: values.email,
                avatar: values.avatar
            }));
            // Add to session history
            dispatch(
                setSessionHistory({
                    pageName: "User Preferences",
                    pageUrl: window.location.pathname,
                    actionType: "Edited profile details",
                })
            );
            resetForm();
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

            dispatch(
                setSessionHistory({
                    pageName: "User Preferences",
                    pageUrl: window.location.pathname,
                    actionType: `Added favorite movie: "${values.movie}"`,
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
        onSubmit: (values, { resetForm }) => {
            dispatch(
                addFavorites({
                    category: "books",
                    item: values.book,
                })
            );
            // Add to session history
            dispatch(
                setSessionHistory({
                    pageName: "User Preferences", // or wherever this form is located
                    pageUrl: window.location.pathname, // current URL
                    actionType: `Added favorite book: "${values.book}"`,
                })
            );

            resetForm();
            setopenAddBookDialog(false)
        },
    });

    const books = useSelector((state) => state.userPreferences.favorites.books);

    const handleFileChange = async (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            const base64 = await fileToBase64(file);
            editProfileFormik.setFieldValue("avatar", base64);
        }
    };


    // const applyThemeColors = (scheme) => {
    //     const colors = themePalettes[scheme];
    //     if (!colors) return;

    //     // Update :root for light theme
    //     const lightColors = colors.light;
    //     Object.keys(lightColors).forEach((key) => {
    //         document.documentElement.style.setProperty(key, lightColors[key]);
    //     });

    //     // Update .dark for dark theme overrides
    //     const darkColors = colors.dark;
    //     const darkRoot = document.querySelector(".dark");
    //     if (darkRoot) {
    //         Object.keys(darkColors).forEach((key) => {
    //             darkRoot.style.setProperty(key, darkColors[key]);
    //         });
    //     }
    // };

    const applyThemeColors = (scheme, theme) => {
        const colors = themePalettes[scheme];
        if (!colors) return;

        // Apply colors based on current theme
        const themeColors = theme === "dark" ? colors.dark : colors.light;
        Object.entries(themeColors).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
        });
    };

    const handleColorSchemeChange = (value) => {
        // 1. Dispatch Redux action
        dispatch(updateColorScheme(value));

        // 2. Apply colors with current theme
        applyThemeColors(value, theme);
    };

    useEffect(() => {
        if (colorScheme && theme) {
            applyThemeColors(colorScheme, theme);
        }
    }, [theme, colorScheme]);





    return (
        <>
            {/* section */}
            <div className='flex flex-col gap-[40px] sm:gap-[44px] md:gap-[48px] lg:gap-[52px] xl:gap-[56px] 2xl:gap-[60px]'>


                {/* Profile section */}
                <div className='flex flex-col md:flex-row gap-3 md:gap-0 md:items-center md:justify-between'>

                    {/* Avatar and Name */}
                    <div className='flex items-center gap-3 md:gap-4'>
                        {/* Avatar */}
                        <div className='w-14 h-14 sm:w-[60px] sm:h-[60px] md:w-[64px] md:h-[64px] lg:w-[68px] lg:h-[68px] xl:w-[70px] xl:h-[70px] 2xl:w-18 2xl:h-18 relative rounded-lg'>
                            {userPreferences.avatar ? (
                                <Image
                                    src={userPreferences.avatar}
                                    alt="user avatar"
                                    fill
                                    className="object-cover w-full h-full rounded-lg"
                                    onError={(e) => { e.currentTarget.src = ""; }} // fallback if broken
                                />
                            ) : (
                                <div className='w-14 h-14 sm:w-[60px] sm:h-[60px] md:w-[64px] md:h-[64px] lg:w-[68px] lg:h-[68px] xl:w-[70px] xl:h-[70px] 2xl:w-18 2xl:h-18 relative rounded-lg bg-profile-bg flex justify-center items-center'>
                                    <User className="w-[24px] h-[24px] sm:w-[27px] sm:h-[27px] md:w-[30px] md:h-[30px] lg:w-[33px] lg:h-[33px] xl:w-[36px] xl:h-[36px] 2xl:w-[40px] 2xl:h-[40px] text-profile-icon" />
                                </div>
                            )}
                        </div>

                        <div>
                            <Heading level="lg" className="font-[800] text-dark font-roboto">{userPreferences.username}</Heading>
                            <Paragraph size='large' className="font-[500] text-light">{userPreferences.email}</Paragraph>
                        </div>
                    </div>

                    {/* Edit profile button */}
                    <div className="self-end">
                        <Button onClick={() => setopenEditProfileDialog(true)}>
                            <Paragraph size="btntext" className="flex items-center gap-1">
                                <span><Pencil /></span>
                                <span>Edit profile</span>
                            </Paragraph>
                        </Button>
                    </div>
                </div>

                <div className='flex flex-col gap-[20px]'>
                    {/* themeSetting */}
                    <div className="border bg-primary-card-bg  rounded-[4px] px-6 pt-[17px] pb-4 flex flex-col gap-[20px]">
                        <div>
                            <Heading
                                className="text-dark font-[600] font-roboto relative pb-2 flex gap-2 items-center"
                                level="sectionheading"
                            >
                                <Palette className="text-primary" />
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

                                <Select
                                    value={theme}
                                    onValueChange={(value) => dispatch(updateTheme(value))}
                                >
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
                                <Select
                                    value={colorScheme}
                                    onValueChange={handleColorSchemeChange}>
                                    <SelectTrigger className="w-full md:w-[180px]">
                                        <SelectValue placeholder="Select scheme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="purple"><div className="flex items-center gap-1">
                                            <div className="w-5 h-5 rounded bg-purple" />
                                            <Paragraph size="sm">Royal Purple</Paragraph>
                                        </div></SelectItem>
                                        <SelectItem value="teal"><div className="flex items-center gap-1">
                                            <div className="w-5 h-5 rounded bg-teal" />
                                            <Paragraph size="sm">Teal Breeze</Paragraph>
                                        </div>
                                        </SelectItem>
                                        <SelectItem value="blue"><div className="flex items-center gap-1">
                                            <div className="w-5 h-5 rounded bg-blue" />
                                            <Paragraph size="sm">Deep Sapphire</Paragraph>
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
                                className="text-dark font-[600] font-roboto relative pb-2 flex gap-2 items-center"
                                level="sectionheading"
                            >
                                <BookHeart className="text-primary" />
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
                                                    className='flex gap-1 items-center font-[500] text-primary border border-primary px-2 py-1 rounded-[6px]'>{movies}
                                                    <X
                                                        onClick={() => {
                                                            dispatch(
                                                                removeFavorites({
                                                                    category: "movies",
                                                                    index: index,
                                                                })
                                                            )
                                                            // Add to session history
                                                            dispatch(
                                                                setSessionHistory({
                                                                    pageName: "User Preferences",
                                                                    pageUrl: window.location.pathname,
                                                                    actionType: `Deleted movie: ${movies}`,
                                                                })
                                                            );

                                                        }
                                                        }
                                                        className="size-3 cursor-pointer" />
                                                </span>
                                            )
                                            )
                                        ) : (<Paragraph size="normal" className='font-[500] text-light'>No movies found</Paragraph>)}

                                    </Paragraph>
                                </div>
                                <div className='flex gap-2'>
                                    <Button
                                        onClick={() => {
                                            // Remove all movies
                                            dispatch(removeAllFavorites({ category: "movies" }));

                                            // session history
                                            dispatch(
                                                setSessionHistory({
                                                    pageName: "User Preferences",
                                                    pageUrl: window.location.pathname,
                                                    actionType: "Deleted all movies",
                                                })
                                            );
                                        }}

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
                                                    className='flex gap-1 items-center font-[500] text-primary border border-primary px-2 py-1 rounded-[6px]'>{book}
                                                    <X
                                                        onClick={() => {
                                                            dispatch(
                                                                setSessionHistory({
                                                                    pageName: "User Preferences",
                                                                    pageUrl: window.location.pathname,
                                                                    actionType: `Deleted book: ${book}`,
                                                                })
                                                            );
                                                            dispatch(removeFavorites({ category: "books", index: index, }));

                                                        }}
                                                        className="size-3 cursor-pointer"
                                                    />
                                                </span>
                                            )
                                            )
                                        ) : (<Paragraph size="normal" className='font-[500] text-light'>No book found</Paragraph>)}

                                    </Paragraph>
                                </div>
                                <div className='flex gap-2'>
                                    <Button
                                        onClick={() => {

                                            dispatch(removeAllFavorites({ category: "books", }))
                                            // session history
                                            dispatch(
                                                setSessionHistory({
                                                    pageName: "User Preferences",
                                                    pageUrl: window.location.pathname,
                                                    actionType: "Deleted all books",
                                                })
                                            );
                                        }
                                        }
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
                    {/* Session History */}
                    <div className="border bg-primary-card-bg  rounded-[4px] px-6 pt-[17px] pb-4 flex flex-col gap-[20px]">
                        <div className="">
                            <Heading
                                className="text-dark font-[600] font-roboto relative pb-2 flex gap-2 items-center"
                                level="sectionheading"
                            >
                                <History className="text-primary" />
                                Session History
                            </Heading>
                            <div className="w-full h-[1px] bg-primary rounded"></div>
                        </div>

                        <div className="flex flex-row items-center justify-between gap-4">
                            <Paragraph size="normal" className="text-light">
                                Clear all session history. This action cannot be undone.
                            </Paragraph>
                            <button onClick={() => dispatch(clearSessionHistory())}>
                                <Paragraph
                                    size="normal"
                                    className="font-[800] text-destructive hover:cursor-pointer whitespace-nowrap"
                                >

                                    Clear All
                                </Paragraph>
                            </button>

                        </div>

                        <div className="max-h-[400px] overflow-y-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[20%]">Page Name</TableHead>
                                        <TableHead className="w-[50%]">Page URL</TableHead>
                                        <TableHead className="w-[15%]">Visited At</TableHead>
                                        <TableHead className="w-[15%]">Action Performed</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sessions.length > 0 ? (
                                        sessions.map((session) => (
                                            <TableRow key={session.sessionId}>
                                                <TableCell>{session.pageName}</TableCell>
                                                <TableCell>{session.pageUrl}</TableCell>
                                                <TableCell>
                                                    {
                                                        new Date(session.timestamp).toLocaleString("en-US", {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                            hour: "numeric",
                                                            minute: "numeric",
                                                            hour12: true
                                                        })
                                                    }
                                                </TableCell>
                                                <TableCell>{session.actionType}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (<TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            <Paragraph size='xl' className="text-extraLight">No data to display</Paragraph>

                                        </TableCell>
                                    </TableRow>)}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    {/* Reset all local storage data */}
                    <div className="border bg-destructive/5 rounded-[4px] px-6 pt-[17px] pb-4 flex flex-col gap-[20px]">
                        <div className="relative inline">
                            <Heading
                                className="text-destructive font-[600] font-roboto relative pb-2 flex gap-2 items-center"
                                level="sectionheading"
                            >
                                <CookingPot />
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
                                <Button className="" variant="destructive" onClick={() => {
                                    setopenConfirmResetDialog(true)
                                }

                                }>
                                    <Paragraph size="btntext" className="font-[700]">
                                        Reset All Data
                                    </Paragraph>
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div >



            {/* Edit Profile*/}
            < Dialog open={openEditProfileDialog} onOpenChange={setopenEditProfileDialog} >
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
                            {editProfileFormik.values.avatar ? (<div className='w-14 h-14 sm:w-[60px] sm:h-[60px] md:w-[64px] md:h-[64px] lg:w-[68px] lg:h-[68px] xl:w-[70px] xl:h-[70px] 2xl:w-[72px] 2xl:h-[72px] relative'>
                                <Image
                                    src={editProfileFormik.values.avatar}
                                    alt="user avatar"
                                    fill
                                    className="object-cover w-full h-full rounded-[4px]"
                                />
                            </div>) : (<div className='w-14 h-14 sm:w-[60px] sm:h-[60px] md:w-[64px] md:h-[64px] lg:w-[68px] lg:h-[68px] xl:w-[70px] xl:h-[70px] 2xl:w-[72px] 2xl:h-[72px] bg-accent flex items-center justify-center rounded-[4px]'>
                                <User className='w-8 h-8 text-light' />
                            </div>)}
                            <div className="flex flex-col gap-2">
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
            </Dialog >

            {/*Add movie*/}
            < Dialog open={openAddMovieDialog} onOpenChange={setopenAddMovieDialog} >
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
            </Dialog >

            {/*Add book*/}
            < Dialog open={openAddBookDialog} onOpenChange={setopenAddBookDialog} >
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
            </Dialog >

            {/* Are you sure you want to reset? */}
            < Dialog open={openConfirmResetDialog} onOpenChange={setopenConfirmResetDialog} >
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

                                className='w-full'
                                onClick={() => setopenConfirmResetDialog(false)}
                            >
                                <Paragraph size="btntext">Take Me Back</Paragraph>
                            </Button>
                        </div>
                        <div className='w-full'>
                            <Button
                                onClick={() => {
                                    dispatch(resetAllPreferences())
                                    dispatch(clearSessionHistory())
                                    dispatch(clearAllProducts())
                                    dispatch(clearAllBlogs())
                                    setopenConfirmResetDialog(false)
                                    toast.success("All data has been successfully reset.")
                                }}
                                variant='destructive'
                                className='w-full'
                            >
                                <Paragraph size="btntext">Yes, Reset</Paragraph>
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog >
        </>
    )

}

export default UserPreferences
