import { Component } from '@angular/core';

@Component({
    templateUrl: './catalog.component.html'
})
export class CatalogComponent {

    orders = [
        {
            orderNumber: '45123',
            orderDate: '7 February 2023',
            amount: '$123.00',
            products: [
                {
                    name: 'Product Name Placeholder A Little Bit Long One',
                    color: 'White',
                    size: 'Small',
                    price: '$50',
                    deliveryDate: 'Delivered on 7 February 2023',
                    image: 'assets//images/container/catalog/catalog-1.png'
                },
                {
                    name: 'Product Name Placeholder A Little Bit Long One',
                    color: 'White',
                    size: 'Small',
                    price: '$50',
                    deliveryDate: 'Delivered on 7 February 2023',
                    image: 'assets//images/container/catalog/catalog-2.png'
                },
                {
                    name: 'Product Name Placeholder A Little Bit Long One',
                    color: 'White',
                    size: 'Small',
                    price: '$63',
                    deliveryDate: 'Delivered on 7 February 2023',
                    image: 'assets//images/container/catalog/catalog-3.png'
                },
            ]
        },
        {
            orderNumber: '45126',
            orderDate: '9 February 2023',
            amount: '$250.00',
            products: [
                {
                    name: 'Product Name Placeholder A Little Bit Long One',
                    color: 'White',
                    size: 'Small',
                    price: '$80',
                    deliveryDate: 'Delivered on 9 February 2023',
                    image: 'assets//images/container/catalog/catalog-4.png'
                },
                {
                    name: 'Product Name Placeholder A Little Bit Long One',
                    color: 'White',
                    size: 'Small',
                    price: '$20',
                    deliveryDate: 'Delivered on 9 February 2023',
                    image: 'assets//images/container/catalog/catalog-5.png'
                },
                {
                    name: 'Product Name Placeholder A Little Bit Long One',
                    color: 'White',
                    size: 'Small',
                    price: '$150',
                    deliveryDate: 'Delivered on 9 February 2023',
                    image: 'assets//images/container/catalog/catalog-6.png'
                },
            ]
        }
    ];

}
