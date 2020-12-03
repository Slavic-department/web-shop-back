import { Controller, Delete, Post, Get, Param, Body, Put, Redirect, HttpCode, HttpStatus, Header } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    // @Redirect('https://google.com')
    getAll(): Promise<Product[]> {
        return this.productsService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<Product> {
        return this.productsService.getById(id)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Controle', 'none')
    create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        createProductDto.versionKey = false;
        return this.productsService.create(createProductDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<Product> {
        return this.productsService.remove(id) 
    }
    
    @Put(':id')
    update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string): Promise<Product> {
        return this.productsService.update(updateProductDto, id)
    }
}
