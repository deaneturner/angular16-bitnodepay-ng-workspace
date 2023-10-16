import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'product-overview', data: { breadcrumb: 'Product Overview' }, loadChildren: () => import('./productoverview/productoverview.module').then(m => m.ProductoverviewModule) },
        { path: 'shopping-cart', data: { breadcrumb: 'Shopping Cart' }, loadChildren: () => import('./shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule) },
        { path: 'checkout-form', data: { breadcrumb: 'Checkout Form' }, loadChildren: () => import('./checkoutform/checkoutform.module').then(m => m.CheckoutFormModule) },
        { path: 'product-list', data: { breadcrumb: 'Product List' }, loadChildren: () => import('./productlist/productlist.module').then(m => m.ProductListModule) },
        { path: 'new-product', data: { breadcrumb: 'New Product' }, loadChildren: () => import('./newproduct/newproduct.module').then(m => m.NewProductModule) },
        { path: 'catalog', data: { breadcrumb: 'Catalog' }, loadChildren: () => import('./containercatalog/container-catalog.module').then(m => m.ContainerCatalogModule) },
        { path: 'container-list', data: { breadcrumb: 'Network Details' }, loadChildren: () => import('./containerlist/containerlist.module').then(m => m.ContainerListModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ContainerRoutingModule { }
