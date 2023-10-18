import { Component } from '@angular/core';

@Component({
    templateUrl: './detail.component.html',
})
export class DetailComponent {

    products = [
        {
            name: 'Cotton Sweatshirt',
            size: 'Medium',
            color: 'White',
            price: '$12',
            quantity: '1',
            image: 'assets/images/container/detail/detail-1-1.png'
        },
        {
            name: 'Regular Jeans',
            size: 'Large',
            color: 'Black',
            price: '$24',
            quantity: '1',
            image: 'assets/images/container/detail/detail-1-2.png'
        }
    ];
}
