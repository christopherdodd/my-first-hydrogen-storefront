import { Suspense } from "react";
import { Layout } from "../components/Layout.server";

export default function NotFound() {
  return (
    <Layout>
      <Suspense>
        <div className="container">
          <div>Page not found</div>
        </div>
      </Suspense>
    </Layout>
  );
}