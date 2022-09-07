import { Suspense } from "react";
import { Layout } from "../components/Layout.server";

export default function Cart() {
  return (
    <Layout>
      <Suspense>
        <div className="container">
          <div>Cart Page</div>
        </div>
      </Suspense>
    </Layout>
  );
}