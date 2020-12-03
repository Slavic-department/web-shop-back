import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

    async getAll(): Promise<Product[]> {
        return this.productModel.find().exec()
    }

    async getById(id: string): Promise<Product> {
        return this.productModel.findById(id)
    }

    async create(productDto: CreateProductDto): Promise<Product> {
        const newProduct = new this.productModel(productDto)
        return newProduct.save()
    }

    async remove(id: string): Promise<Product> {
        return this.productModel.findByIdAndRemove(id)
    }

    // TODO Андрей Ларионов: разобраться, почему при установке типа UpdateProductDto для productDto, функция, принимая его вторым аргументом, считает его неправильным. При том, что если убрать тип, и положить сюда тот же объект, функция сработает нормально.
    async update(productDto: UpdateProductDto, id: string): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, [productDto], { new: true })
    }
}