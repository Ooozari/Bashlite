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
import { useSelector, useDispatch } from 'react-redux';
import { Package } from 'lucide-react';
import { addProduct, deleteProduct, updateProduct } from '@/features/productsSlice';
import { fileToBase64 } from '@/utils/fileHelpers';
import { setSessionHistory } from '@/features/sessionHistorySlice'
import { toast } from 'sonner';




function ManageProducts() {
    const products = useSelector((state) => state.userProducts.products)
    const [openEditProductDialog, setopenEditProductDialog] = useState(false)
    const [openAddProductDialog, setopenAddProductDialog] = useState(false)
    const [selectedProduct, setselectedProduct] = useState(null)
    const dispatch = useDispatch()


    const editProductFormik = useFormik({
        initialValues: {
            id: selectedProduct?.id,
            imageURL: selectedProduct?.imageURL || "",
            name: selectedProduct?.name || "",
            price: selectedProduct?.price || "",
            category: selectedProduct?.category || "",
        },
        validationSchema: EditProductSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(updateProduct({
                id: values.id,
                imageURL: values.imageURL,
                name: values.name,
                price: values.price,
                category: values.category,
            }))

            dispatch(
                setSessionHistory({
                    pageName: "Product",
                    pageUrl: window.location.pathname,
                    actionType: `Edited a product: ${values.name}`,
                })
            );
            toast.success("Product details updated successfully.")
            setopenEditProductDialog(false)
        },
    });

    // Edit Product
    const handleEditFileChange = async (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            const base64 = await fileToBase64(file);
            editProductFormik.setFieldValue("imageURL", base64);
        }
    };

    const addProductFormik = useFormik({
        initialValues: {
            imageURL: null,
            name: "",
            price: "",
            category: "",
        },
        validationSchema: AddProductSchema,
        enableReinitialize: true,
        onSubmit: (values, { resetForm }) => {
            dispatch(addProduct({
                imageURL: values.imageURL,
                name: values.name,
                price: values.price,
                category: values.category,
            }))

            dispatch(
                setSessionHistory({
                    pageName: "Product",
                    pageUrl: window.location.pathname,
                    actionType: `Added a product: ${values.name}`,
                })
            );
            resetForm()
            setopenAddProductDialog(false)
        },
    });

    // Add Product
    const handleFileChange = async (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            const base64 = await fileToBase64(file);
            addProductFormik.setFieldValue("imageURL", base64);
        }
    };


    return (
        <>
            <div className='flex flex-col gap-3 md:gap-5'>
                <div className='inline-flex justify-end'>
                    <Button
                        variant="secondary" size="sm"
                        onClick={() => setopenAddProductDialog(true)}>Add Product</Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[20%]" >Image</TableHead>
                            <TableHead className="w-[25%]">Name</TableHead>
                            <TableHead className="w-[25%]">Category</TableHead>
                            <TableHead className="w-[20%]">Price</TableHead>
                            <TableHead className="w-[10%]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.length > 0 ? (
                            products.map((product) => (<TableRow>
                                <TableCell>
                                    {product.imageURL ? (<div className='w-[50px] h-[50px] sm:w-[56px] sm:h-[56px] md:w-[62px] md:h-[62px] lg:w-[68px] lg:h-[68px] xl:w-[74px] xl:h-[74px] 2xl:w-[80px] 2xl:h-[80px] rounded-[4px] relative'>
                                        <Image
                                            src={product.imageURL}
                                            alt='productimg'
                                            fill
                                            className='w-full h-full object-cover aspect-square rounded-[4px] shadow-xs'
                                        />
                                    </div>) : (<div className='w-[50px] h-[50px] sm:w-[56px] sm:h-[56px] md:w-[62px] md:h-[62px] lg:w-[68px] lg:h-[68px] xl:w-[74px] xl:h-[74px] 2xl:w-[80px] 2xl:h-[80px] bg-accent flex items-center justify-center rounded-[4px]'>
                                        <Package className='w-8 h-8 text-light' />
                                    </div>)}

                                </TableCell>
                                <TableCell className="">{product.name}</TableCell>
                                <TableCell className="">{product.category}</TableCell>
                                <TableCell className="">${product.price}</TableCell>

                                <TableCell className="text-right sticky right-0 z-20 ">
                                    <div className='inline-flex gap-2 bg-primary-page-bg p-1 justify-end'>
                                        <Button
                                            onClick={() => {
                                                dispatch(deleteProduct(product.id))
                                                dispatch(
                                                    setSessionHistory({
                                                        pageName: "Product",
                                                        pageUrl: window.location.pathname,
                                                        actionType: `Deleted a product: ${product.name}`,
                                                    })
                                                );
                                            }}
                                            variant="ghost" className="bg-destructive/20 hover:bg-destructive/10 text-destructive hover:text-destructive p-[6px]">
                                            <div className='w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] md:w-[16px] md:h-[16px] lg:w-[17px] lg:h-[17px] xl:w-[18px] xl:h-[18px] 2xl:w-[20px] 2xl:h-[20px] flex items-center justify-center'>
                                                <Trash className='w-full h-full' />
                                            </div>

                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setselectedProduct(product)
                                                setopenEditProductDialog(true)

                                            }}
                                            variant="ghost" className="bg-primary/20 hover:bg-primary/10 text-primary hover:text-primary  p-[6px]">
                                            <div className='w-[14px] h-[14px] sm:w-[15px] sm:h-[15px] md:w-[16px] md:h-[16px] lg:w-[17px] lg:h-[17px] xl:w-[18px] xl:h-[18px] 2xl:w-[20px] 2xl:h-[20px] flex items-center justify-center'>
                                                <Pencil className='w-full h-full' />
                                            </div>

                                        </Button>
                                    </div>

                                </TableCell>

                            </TableRow>))) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">
                                    <Paragraph size='xl' className="text-extraLight">No data to display</Paragraph>

                                </TableCell>
                            </TableRow>
                        )}

                    </TableBody>
                </Table>
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
                            {/* Product Picture Field */}
                            {addProductFormik.values.imageURL ? (<div className='w-14 h-14 sm:w-[60px] sm:h-[60px] md:w-[64px] md:h-[64px] lg:w-[68px] lg:h-[68px] xl:w-[70px] xl:h-[70px] 2xl:w-18 2xl:h-18 relative'>
                                <img
                                    src={addProductFormik.values.imageURL}
                                    alt="user avatar"
                                    fill
                                    className="object-cover w-full h-full rounded-[4px]"
                                />
                            </div>) : (<div className='w-14 h-14 sm:w-[60px] sm:h-[60px] md:w-[64px] md:h-[64px] lg:w-[68px] lg:h-[68px] xl:w-[70px] xl:h-[70px] 2xl:w-18 2xl:h-18 bg-accent flex items-center justify-center rounded-[4px]'>
                                <Package className='w-8 h-8 text-light' />
                            </div>)}
                            <div className="flex flex-col gap-2 w-full">
                                <Label htmlFor="imageURL">
                                    <Paragraph size="label">Product image</Paragraph>
                                </Label>
                                <div className='relative'>
                                    <Input
                                        id="imageURL"
                                        name="imageURL"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                    <ErrorMessage
                                        error={addProductFormik.errors.imageURL}
                                        touched={addProductFormik.touched.imageURL}
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
                    {selectedProduct && (<form
                        onSubmit={editProductFormik.handleSubmit
                        }
                        className="grid gap-6"
                    >
                        <div className='flex gap-6 items-center'>
                            {/* Product Picture Field */}
                            {editProductFormik.values.imageURL ? (<div className='w-14 h-14 sm:w-[60px] sm:h-[60px] md:w-[64px] md:h-[64px] lg:w-[68px] lg:h-[68px] xl:w-[70px] xl:h-[70px] 2xl:w-18 2xl:h-18 relative'>
                                <Image
                                    src={editProductFormik.values.imageURL}
                                    alt="user avatar"
                                    fill
                                    className="object-cover w-full h-full rounded-[4px]"
                                />
                            </div>) : (<div className='w-14 h-14 sm:w-[60px] sm:h-[60px] md:w-[64px] md:h-[64px] lg:w-[68px] lg:h-[68px] xl:w-[70px] xl:h-[70px] 2xl:w-18 2xl:h-18 bg-accent flex items-center justify-center rounded-[4px]'>
                                <Package className='w-8 h-8 text-light' />
                            </div>)}
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
                                        onChange={handleEditFileChange}
                                    />
                                    <ErrorMessage
                                        error={editProductFormik.errors.imageURL}
                                        touched={editProductFormik.touched.imageURL}
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
                    </form>)}

                </DialogContent>
            </Dialog>

        </>
    )
}

export default ManageProducts
