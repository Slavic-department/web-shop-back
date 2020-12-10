import { Controller, Delete, Post, Get, Param, Body, Put, Redirect, HttpCode, HttpStatus, Header } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    // Получение всех документов
    @Get()
    getAll(): Promise<Product[]> {
        return this.productsService.getAll()
    }

    // Получение документа по id
    @Get(':id')
    getOne(@Param('id') id: string): Promise<Product> {
        return this.productsService.getById(id)
    }

    // Добавление нового документа
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.create(createProductDto)
    }

    // Удаление документа по id
    @Delete(':id')
    delete(@Param('id') id: string): Promise<Product> {
        return this.productsService.remove(id) 
    }
    
    // Изменение документа по id
    @Put(':id')
    update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string): Promise<Product> {
        return this.productsService.update(updateProductDto, id)
    }
}
