import Button from "@/components/Button";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div className="wrapper py-8 justify-between">
      <div className="flex-center flex-col">
        <h1 className="h1 my-3">Hi, 🌸{user?.username}🌸</h1>
        <p>({user?.email})</p>
      </div>
      <form action={logOut}>
        <Button text="로그아웃" />
      </form>
    </div>
  );
}
