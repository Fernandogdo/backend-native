import { Request, Response } from 'express'
import Category from '../models/Category'
import path from 'path';
import fs from 'fs-extra';
import {uploadFile, getFileStream} from '../s3';
import cloudinary from "cloudinary";
// import uploadFile from "../s3";
cloudinary.v2.config({
    cloud_name: 'dhpsdeqwi',
    api_key: '554281482924474',
    api_secret: 'gThcPFC0L7tFb38fSvG7NlHA-K0',
})

export async function getCategories(req: Request, res: Response): Promise<Response> {
    const categories = await Category.find();
    return res.json(categories)
}

export async function getCategory(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const category = await Category.findById(id)
    console.log('category', category, res)
    const readStream = getFileStream('8fe2a3e7-6218-4a66-9a99-c60d363d781c.jpeg')
    
    console.log("readStream", readStream)
    readStream.pipe(res)
    return res.json(category)
}

export async function createCategory(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body
    const file:any = req.file?.path
    const result = await cloudinary.v2.uploader.upload(file)
    // console.log(result)

    const newPhoto = {
        title: title,
        description: description,
        imagePath: result.url
    };

    const category = new Category(newPhoto);
    // const result =  uploadFile(file)

    await category.save()
    await fs.unlink(file)
  
    return res.json({
        message: 'Photo created successfully',
        category
    })
}


export async function deleteCategory(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    console.log('EliminarId', id)
    const category = await Category.findByIdAndRemove(id);
    // if (category) {
    //     fs.unlink(path.resolve(category.imagePath))
    // }
    return res.json({
        message: "Category deleted",
        category
    })
}


export async function updatedCategory(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description } = req.body;
    console.log(req.body)
    const updatedCategory = await Category.findByIdAndUpdate(id, {
        title,
        description
    }, { new: true });

    return res.json({
        message: "Update susccesfully",
        updatedCategory
    })

}