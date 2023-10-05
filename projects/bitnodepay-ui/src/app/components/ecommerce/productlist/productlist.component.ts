import {Component} from '@angular/core';

@Component({
  templateUrl: './productlist.component.html'
})
export class ProductListComponent {

  color1: string = 'Bluegray';

  network = [
    {
      title: 'Starting and stopping a node',
      type: 'Bitcoind Node Basics',
    },
    {
      title: 'LND Node Configuration',
      type: 'Lightning Transfer',
    },
    {
      title: 'LND Node Configuration',
      type: 'Ligtning Channel Creation',
    },
    {
      title: 'LND Node Configuration',
      type: 'Lightning Channel Closure',
    },
    {
      title: 'LND Node Configuration',
      type: 'Lightning Channel Balancing',
    },
    {
      title: 'LND Node Configuration',
      type: 'Bitcoin / Lightning Wallet',
    }
  ];
}
