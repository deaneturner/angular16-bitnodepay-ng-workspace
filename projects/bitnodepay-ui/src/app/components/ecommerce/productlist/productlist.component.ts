import {Component} from '@angular/core';

@Component({
  templateUrl: './productlist.component.html'
})
export class ProductListComponent {

  color1: string = 'Bluegray';

  network = [
    {
      title: 'Starting and stopping a node',
      description: 'Learn how to start and stop a node',
      type: 'Bitcoind Node Basics',
    },
    {
      title: 'LND Node Configuration',
      description: 'Learn how to configure your LND node',
      type: 'Lightning Transfer',
    },
    {
      title: 'LND Node Configuration',
      description: 'Learn how to configure your LND node',
      type: 'Ligtning Channel Creation',
    },
    {
      title: 'LND Node Configuration',
      description: 'Learn how to configure your LND node',
      type: 'Lightning Channel Closure',
    },
    {
      title: 'LND Node Configuration',
      description: 'Learn how to configure your LND node',
      type: 'Lightning Channel Balancing',
    },
    {
      title: 'LND Node Configuration',
      type: 'Bitcoin / Lightning Wallet',
    }
  ];
}
