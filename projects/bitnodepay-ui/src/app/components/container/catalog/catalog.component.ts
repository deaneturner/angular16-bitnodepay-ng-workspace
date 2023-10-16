import {Component, OnInit} from '@angular/core';
import {ContainerService} from "../../../service/container.service";
import {Container} from "../../../api/container";
import {Observable, map, of} from "rxjs";
import {switchMap} from "rxjs/operators";

@Component({
    templateUrl: './catalog.component.html'
})
export class CatalogComponent implements OnInit {

    containers$: Observable<Container[]>;
    containersView$: Observable<any>;

    networkList$: Observable<any>;

    constructor(private containerService: ContainerService) {
        this.containers$ = this.containerService.getContainers();
        this.containersView$ = this.containers$.pipe(
            map(containers => {
                return containers.map(container => {
                    return {
                        names: container.Names.toString(),
                        image: container.Image,
                        command: 'TODO', // '/usr/local/bin/bitcoind-entrypoint.sh /usr/local/bin/mine.sh',
                        port: 'TODO', // '[TCP] 12005',
                        cpu: 'No data',
                        ram: 'No data',
                        actions: ['Start', 'Remove', 'Logs'],
                    }
                });
            })
        );
        this.networkList$ = this.containersView$.pipe(
            switchMap(containers => {
                return of([{
                    name: 'Bitcoin Daemon',
                    lastUpdated: '7 February 2023',
                    uptime: '123 minutes',
                    nodes: containers
                }]);
            })
        );
    }

    networks = [
        {
            name: 'Bitcoin Daemon',
            lastUpdated: '7 February 2023',
            uptime: '123 minutes',
            nodes: [
                {
                    names: 'bitcoind',
                    image: 'lnbook/bitcond',
                    command: '/usr/local/bin/bitcoind-entrypoint.sh /usr/local/bin/mine.sh',
                    port: '[TCP] 12005',
                    cpu: 'No data',
                    ram: 'No data',
                    actions: ['Start', 'Remove', 'Logs'],
                },
                {
                    names: 'bitcoind',
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

    ngOnInit(): void {
        this.networkList$.subscribe(res => {
            console.log(res);
        });
    }

}
