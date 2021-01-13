import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
        // TODO: подумать, правильно ли id сравнивать и с _id, и с кодом товара 
        return this.productModel.findOne({ "$or": [{"_id": id}, {"code": id}] } )
    }

    async create(productDto: CreateProductDto): Promise<Product> {
        const newProduct = new this.productModel(productDto)
        return newProduct.save()
    }

    async remove(id: string): Promise<Product> {
        return this.productModel.findByIdAndRemove(id)
    }

    async update(productDto: UpdateProductDto, id: string): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, [productDto], { new: true })
    }
}