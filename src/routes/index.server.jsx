import { Suspense } from "react";
import { Layout } from "../components/Layout.server";

export default function Home() {
  return (
    <Layout>
      <Suspense>
        <div className="container">
          <div>Home page</div>
        </div>
      </Suspense>
    </Layout>
  );
}