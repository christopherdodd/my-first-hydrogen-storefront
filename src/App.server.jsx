import React from 'react';
import renderHydrogen from '@shopify/hydrogen/entry-server';
import {Router, FileRoutes, ShopifyProvider, CartProvider, Route} from '@shopify/hydrogen';
import {Suspense} from 'react';

import {Layout} from './components/Layout.server';

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ShopifyProvider>
        <CartProvider>
          <Router>
            <FileRoutes />
            <Route path="*" page={<NotFound />} />
          </Router>
        </CartProvider>
      </ShopifyProvider> 
    </Suspense>
  );
}

export default renderHydrogen(App);

function NotFound() {
  return (
    <Layout>
      <div className="container">
          <div>Page not found</div>
      </div>
    </Layout>
  );
}

function PageLoader() {
  return (
    <>
      <header>
          <div className="container header-inner">
            <a className="header-logo skeleton">
              Loading shop
            </a>
            <ul className="header-navigation skeleton">
              <li><a>Catalog</a></li>
              <li><a>Shoes</a></li>
              <li><a>Link 3</a></li>
            </ul>
            <a className="header-cart-link skeleton">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </a>
          </div>
        </header>
        <main className="skeleton">

        </main>
    </>
  )
}