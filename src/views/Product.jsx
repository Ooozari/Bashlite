"use client";
import React, { useState, useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useFormik } from 'formik';
import Image from 'next/image'
import Ghee from '@/assets/Ghee.png'
import { Button } from "@/components/ui/button"
import { Heading, Paragraph } from '@/components/ui/typography'
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
import { EditProductSchema, AddProductSchema } from '@/validations';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash, Pencil } from "lucide-react"
function Product() {
    const [openEditProductDialog, setopenEditProductDialog] = useState(false)
    const [openAddProductDialog, setopenAddProductDialog] = useState(false)
    const [preview, setPreview] = useState(false)

    const editProductFormik = useFormik({
        initialValues: {
            name: "",
            price: "",
            category: "",
            productImage: "",
        },
        validationSchema: EditProductSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            setopenEditProductDialog(false)
        },
    });
    const addProductFormik = useFormik({
        initialValues: {
            name: "",
            price: "",
            category: "",
            productImage: "",
        },
        validationSchema: AddProductSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            setopenAddProductDialog(false)
        },
    });
    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            editProfileFormik.setFieldValue("avatar", file);
            const previewURL = URL.createObjectURL(file);
            setPreview(previewURL);
        }
    };
    return (
        <>
            <div className='flex flex-col gap-5'>
                <div>
                    <Heading level='h3' className="font-[700] font-roboto text-normal">Manage Your Products</Heading>
                    <Paragraph className="text-light font-[500] max-w-[600px]">
                        View, add, edit, or remove products in your dashboard. Keep your product catalog up-to-date and organized for better management.
                    </Paragraph>
                </div>
                
                <div className='flex flex-col gap-3'>
                    <div className='inline-flex justify-end'>
                        <Button onClick={() => setopenAddProductDialog(true)}>Add Product</Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[30%]" >Image</TableHead>
                                <TableHead className="w-[25%]">Name</TableHead>
                                <TableHead className="w-[15%]">Category</TableHead>
                                <TableHead className="w-[15%]">Price</TableHead>
                                <TableHead className=""></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <div className='w-[50px] h-[50px] sm:w-[56px] sm:h-[56px] md:w-[62px] md:h-[62px] lg:w-[68px] lg:h-[68px] xl:w-[74px] xl:h-[74px] 2xl:w-[80px] 2xl:h-[80px]'>
                                        <Image
                                            src={Ghee}
                                            alt='productimg'
                                            className='w-full h-full object-cover aspect-square rounded-[4px] shadow-xs'
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="">Mangoes</TableCell>
                                <TableCell className="">Fruits</TableCell>
                                <TableCell className="">$250.00</TableCell>

                                <TableCell className="text-right sticky right-0 z-20 ">
                                    <div className='inline-flex gap-2 bg-white p-1 justify-end'>
                                        <Button variant="ghost" className="bg-destructive/20 hover:bg-destructive/10 text-destructive hover:text-destructive h-7 px-1">
                                            <Trash />
                                        </Button>
                                        <Button
                                            onClick={() => setopenEditProductDialog(true)}
                                            variant="ghost" className="bg-primary/20 hover:bg-primary/10 text-primary hover:text-primary px-1 h-7">
                                            <Pencil />
                                        </Button>
                                    </div>

                                </TableCell>

                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div className='w-[50px] h-[50px] sm:w-[56px] sm:h-[56px] md:w-[62px] md:h-[62px] lg:w-[68px] lg:h-[68px] xl:w-[74px] xl:h-[74px] 2xl:w-[80px] 2xl:h-[80px]'>
                                        <Image
                                            src={Ghee}
                                            alt='productimg'
                                            className='w-full h-full object-cover aspect-square rounded-[4px] shadow-xs'
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="">Mangoes</TableCell>
                                <TableCell className="">Fruits</TableCell>
                                <TableCell className="">$250.00</TableCell>

                                <TableCell className="text-right sticky right-0 z-20 ">
                                    <div className='inline-flex gap-2 bg-white p-1 justify-end'>
                                        <Button variant="ghost" className="bg-destructive/20 hover:bg-destructive/10 text-destructive hover:text-destructive h-7 px-1">
                                            <Trash />
                                        </Button>
                                        <Button
                                            onClick={() => setopenEditProductDialog(true)}
                                            variant="ghost" className="bg-primary/20 hover:bg-primary/10 text-primary hover:text-primary px-1 h-7">
                                            <Pencil />
                                        </Button>
                                    </div>

                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>



            {/* Add Product*/}
            <Dialog open={openAddProductDialog} onOpenChange={setopenAddProductDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-start">Add New Product</DialogTitle>
                        <DialogDescription>Enter the product details below, including image, name, price, and category.</DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={addProductFormik.handleSubmit}
                        className="grid gap-6"
                    >
                        <div className='flex gap-6 items-center'>
                            {/* Profile Picture Field */}
                            <div className='w-14 h-14 sm:w-[60px] sm:h-[60px] md:w-[64px] md:h-[64px] lg:w-[68px] lg:h-[68px] xl:w-[70px] xl:h-[70px] 2xl:w-18 2xl:h-18 relative'>
                                <Image
                                    src={Ghee}
                                    alt="user avatar"
                                    fill
                                    className="object-cover w-full h-full rounded-[4px]"
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <Label htmlFor="image">
                                    <Paragraph size="label">Product image</Paragraph>
                                </Label>
                                <div className='relative'>
                                    <Input
                                        id="image"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    <ErrorMessage
                                        error={addProductFormik.errors.productImage}
                                        touched={addProductFormik.touched.productImage}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="name">
                                <Paragraph size="label">Product name</Paragraph>
                            </Label>

                            <div className="relative">
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Enter product name"
                                    value={addProductFormik.values.name}
                                    onChange={addProductFormik.handleChange}
                                    onBlur={addProductFormik.handleBlur}
                                    className="w-full"
                                />
                                {addProductFormik.touched.name && addProductFormik.errors.name && (
                                    <ErrorMessage
                                        error={addProductFormik.errors.name}
                                        touched={addProductFormik.touched.name}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="price">
                                <Paragraph size="label">Product price</Paragraph>
                            </Label>

                            <div className="relative">
                                <Input
                                    id="price"
                                    name="price"
                                    placeholder="Enter product price"
                                    value={addProductFormik.values.price}
                                    onChange={addProductFormik.handleChange}
                                    onBlur={addProductFormik.handleBlur}
                                    className="w-full"
                                />
                                {addProductFormik.touched.price && addProductFormik.errors.price && (
                                    <ErrorMessage
                                        error={addProductFormik.errors.price}
                                        touched={addProductFormik.touched.price}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="category">
                                <Paragraph size="label">Product category</Paragraph>
                            </Label>

                            <div className="relative">
                                <Input
                                    id="category"
                                    name="category"
                                    placeholder="Enter product category"
                                    value={addProductFormik.values.category}
                                    onChange={addProductFormik.handleChange}
                                    onBlur={addProductFormik.handleBlur}
                                    className="w-full"
                                />
                                {addProductFormik.touched.category && addProductFormik.errors.category && (
                                    <ErrorMessage
                                        error={addProductFormik.errors.category}
                                        touched={addProductFormik.touched.category}
                                    />
                                )}
                            </div>
                        </div>


                        <Button type="submit" className="w-full">
                            <Paragraph size="btntext">Add Product</Paragraph>
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>


            {/* Edit Product*/}
            <Dialog open={openEditProductDialog} onOpenChange={setopenEditProductDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-start">Edit Product</DialogTitle>
                        <DialogDescription>Update the product details below. Changes will be saved to your dashboard.</DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={editProductFormik.handleSubmit}
                        className="grid gap-6"
                    >
                        <div className='flex gap-6 items-center'>
                            {/* Profile Picture Field */}
                            <div className='w-14 h-14 sm:w-[60px] sm:h-[60px] md:w-[64px] md:h-[64px] lg:w-[68px] lg:h-[68px] xl:w-[70px] xl:h-[70px] 2xl:w-18 2xl:h-18 relative'>
                                <Image
                                    src={Ghee}
                                    alt="user avatar"
                                    fill
                                    className="object-cover w-full h-full rounded-[4px]"
                                />
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <Label htmlFor="image">
                                    <Paragraph size="label">Product image</Paragraph>
                                </Label>
                                <div className='relative'>
                                    <Input
                                        id="image"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    <ErrorMessage
                                        error={editProductFormik.errors.productImage}
                                        touched={editProductFormik.touched.productImage}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="name">
                                <Paragraph size="label">Product name</Paragraph>
                            </Label>

                            <div className="relative">
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Enter product name"
                                    value={editProductFormik.values.name}
                                    onChange={editProductFormik.handleChange}
                                    onBlur={editProductFormik.handleBlur}
                                    className="w-full"
                                />
                                {editProductFormik.touched.name && editProductFormik.errors.name && (
                                    <ErrorMessage
                                        error={editProductFormik.errors.name}
                                        touched={editProductFormik.touched.name}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="price">
                                <Paragraph size="label">Product price</Paragraph>
                            </Label>

                            <div className="relative">
                                <Input
                                    id="price"
                                    name="price"
                                    placeholder="Enter product price"
                                    value={editProductFormik.values.price}
                                    onChange={editProductFormik.handleChange}
                                    onBlur={editProductFormik.handleBlur}
                                    className="w-full"
                                />
                                {editProductFormik.touched.price && editProductFormik.errors.price && (
                                    <ErrorMessage
                                        error={editProductFormik.errors.price}
                                        touched={editProductFormik.touched.price}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="category">
                                <Paragraph size="label">Product category</Paragraph>
                            </Label>

                            <div className="relative">
                                <Input
                                    id="category"
                                    name="category"
                                    placeholder="Enter product category"
                                    value={editProductFormik.values.category}
                                    onChange={editProductFormik.handleChange}
                                    onBlur={editProductFormik.handleBlur}
                                    className="w-full"
                                />
                                {editProductFormik.touched.category && editProductFormik.errors.category && (
                                    <ErrorMessage
                                        error={editProductFormik.errors.category}
                                        touched={editProductFormik.touched.category}
                                    />
                                )}
                            </div>
                        </div>


                        <Button type="submit" className="w-full">
                            <Paragraph size="btntext">Save Changes</Paragraph>
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Product
