'use client';
import React, { useState } from 'react'
import { useFormik } from 'formik';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Heading, Paragraph } from '@/components/ui/typography'
import Image from 'next/image'
import avatarUrl from "@/assets/pic.jpg"
import { Pencil } from 'lucide-react'
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
import { EditProfileSchema } from '@/validations';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function UserPreferences() {
    let username = "Uzair Asif"
    let email = "abc@gmail.com"
    const [preview, setPreview] = useState(avatarUrl);
    const [openEditProfileDialog, setopenEditProfileDialog] = useState(false);

    const editProfileFormik = useFormik({
        initialValues: {
            email: email,
            username: username,
            profilePicture: null,
        },
        validationSchema: EditProfileSchema,
        onSubmit: (values) => {
            console.log('Updated Profile:', values);
            // API call goes here
        },
    });
    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            editProfileFormik.setFieldValue("profilePicture", file);
            const previewURL = URL.createObjectURL(file);
            setPreview(previewURL);
        }
    };

    return (
        <>
            {/* heading */}
            <div>
                <Heading level='pageheading' className="font-extrabold text-textDark">User Preferences</Heading>
            </div>
            {/* section */}
            <div className='flex flex-col gap-10  max-w-full px-10'>
                {/* Profile section */}
                <div className='flex items-center justify-between'>

                    {/* Avatar and Name */}
                    <div className='flex items-center gap-4'>
                        {/* Avtar */}
                        <div className='w-14 h-14 sm:w-[60px] sm:h-[60px] md:w-[64px] md:h-[64px] lg:w-[68px] lg:h-[68px] xl:w-[70px] xl:h-[70px] 2xl:w-18 2xl:h-18'>
                            <Image
                                src={avatarUrl}
                                alt="user avatar"
                                className="object-cover w-full h-full rounded-[4px]"
                            />
                        </div>
                        <div>
                            <Heading level="medium" className="font-[700] text-textDark">{username}</Heading>
                            <Paragraph size='large' className="font-[500] text-textNormal">{email}</Paragraph>
                        </div>

                    </div>

                    {/* Edit profile button */}
                    <div>
                        <Button onClick={() => setopenEditProfileDialog(true)}>
                            <Paragraph size="btntext" className="flex items-center gap-1">
                                <span><Pencil /></span>
                                <span>Edit</span>
                            </Paragraph>
                        </Button>
                    </div>
                </div>

                {/* themeSetting */}
                <div className="border border-gray-500 rounded-[4px] px-6 pt-6 pb-4 relative">
                    <div className="absolute -top-3 left-6 px-2 bg-amber-400 rounded-[2px]">
                        <Heading
                            className="text-gray-700"
                            level="normal"
                        >
                            Theme Setting
                        </Heading>
                    </div>

                    <div className='flex justify-between items-center'>
                        <Paragraph size='large' className="font-[600] text-textNormal" >Theme mode</Paragraph>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex justify-between items-center'>
                        <Paragraph size='large' className="font-[600] text-textNormal">Theme color</Paragraph>
                        {/* Theme color preview blocks */}
                        <div className="flex gap-4 mt-4">
                            {/* Purple theme */}
                            <div className="flex items-center gap-1">
                                <div className="w-5 h-5 rounded bg-[#816bff]" />
                                <Paragraph size="sm">Purple</Paragraph>
                            </div>

                            {/* Blue theme */}
                            <div className="flex items-center gap-1">
                                <div className="w-5 h-5 rounded bg-[#3B82F6]" />
                                <Paragraph size="sm">Blue</Paragraph>
                            </div>

                            {/* Green theme */}
                            <div className="flex items-center gap-1">
                                <div className="w-5 h-5 rounded bg-[#22C55E]" />
                                <Paragraph size="sm">Green</Paragraph>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Profile*/}
            <Dialog open={openEditProfileDialog} onOpenChange={setopenEditProfileDialog}>
                <DialogContent className='xs:w-[400px] sm:w-[440px] md:w-[480px] lg:w-[490px] xl:w-[500px] 2xl:w-[540px] '>
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
                                    src={preview}
                                    alt="user avatar"
                                    fill
                                    className="object-cover w-full h-full rounded-[4px]"
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <Label htmlFor="profilePicture">
                                    <Paragraph size="label">Profile Picture</Paragraph>
                                </Label>
                                <div className='relative'>
                                    <Input
                                        id="profilePicture"
                                        name="profilePicture"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    <ErrorMessage
                                        error={editProfileFormik.errors.profilePicture}
                                        touched={editProfileFormik.touched.profilePicture}
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
                                    type="email"
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
        </>
    )
}

export default UserPreferences
