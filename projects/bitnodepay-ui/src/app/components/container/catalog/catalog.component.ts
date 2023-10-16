import { Component } from '@angular/core';

@Component({
    templateUrl: './catalog.component.html'
})
export class CatalogComponent {

    networks = [
        {
            name: 'Bitcoin Daemon',
            lastUpdated: '7 February 2023',
            uptime: '123 minutes',
            nodes: [
                {
                    name: 'bitcoind',
                    image: 'lnbook/bitcond',
                    command: '/usr/local/bin/bitcoind-entrypoint.sh /usr/local/bin/mine.sh',
                    port: '[TCP] 12005',
                    cpu: 'No data',
                    ram: 'No data',
                    actions: ['Start', 'Remove', 'Logs'],
                },
                {
                    name: 'bitcoind',
                    image: 'lnbook/bitcond',
                    command: '/usr/local/bin/bitcoind-entrypoint.sh /usr/local/bin/mine.sh',
                    port: '[TCP] 12005',
                    cpu: 'No data',
                    ram: 'No data',
                    actions: ['Start', 'Remove', 'Logs'],
                },
            ]
        },
        // {
        //     orderNumber: '45126',
        //     orderDate: '9 February 2023',
        //     amount: '$250.00',
        //     products: [
        //         {
        //             name: 'Product Name Placeholder A Little Bit Long One',
        //             color: 'White',
        //             size: 'Small',
        //             price: '$80',
        //             deliveryDate: 'Delivered on 9 February 2023',
        //             image: 'assets//images/container/catalog/catalog-4.png'
        //         },
        //         {
        //             name: 'Product Name Placeholder A Little Bit Long One',
        //             color: 'White',
        //             size: 'Small',
        //             price: '$20',
        //             deliveryDate: 'Delivered on 9 February 2023',
        //             image: 'assets//images/container/catalog/catalog-5.png'
        //         },
        //         {
        //             name: 'Product Name Placeholder A Little Bit Long One',
        //             color: 'White',
        //             size: 'Small',
        //             price: '$150',
        //             deliveryDate: 'Delivered on 9 February 2023',
        //             image: 'assets//images/container/catalog/catalog-6.png'
        //         },
        //     ]
        // }
    ];

}
