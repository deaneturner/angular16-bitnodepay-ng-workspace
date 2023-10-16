import { Component } from '@angular/core';

@Component({
    templateUrl: './containerlist.component.html',
})
export class ContainerListComponent {

    products = [
        {
            name: 'Cotton Sweatshirt',
            size: 'Medium',
            color: 'White',
            price: '$12',
            quantity: '1',
            image: 'assets/images/container/containerlist/container-list-1-1.png'
        },
        {
            name: 'Regular Jeans',
            size: 'Large',
            color: 'Black',
            price: '$24',
            quantity: '1',
            image: 'assets/images/container/containerlist/container-list-1-2.png'
        }
    ];
}
