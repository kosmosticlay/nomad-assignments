import Header from "@/components/header";
import db from "@/lib/db";
import getSession from "@/lib/session";

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
}

export default async function Profile() {
  const user = await getUser();

  return (
    <div className="wrapper">
      <Header title="내 정보" />
      <div className="flex-center flex-col">
        <h1 className="h1 my-3">🌸{user?.username}🌸</h1>
        <p>({user?.email})</p>
      </div>
    </div>
  );
}
