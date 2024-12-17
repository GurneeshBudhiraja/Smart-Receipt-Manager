import { HomeHeader } from "@/components/home-header";
import { headers } from "next/headers";
async function page() {
  const headersList = await headers();
  const isLogin = headersList.get("x-is-login") === "true" ? true : false;
  return (
    <div>
      <HomeHeader isLogin={isLogin} />
      <div>
        <h1>Main page</h1>
      </div>
      <div>section 2</div>
    </div>
  );
}

export default page;
