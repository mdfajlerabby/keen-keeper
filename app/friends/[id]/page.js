import { notFound } from "next/navigation";
import friends from "../../data/friends.json";
import FriendDetail from "../../components/FriendDetail";

export function generateStaticParams() {
  return friends.map((friend) => ({ id: String(friend.id) }));
}
export default async function FriendPage({ params }) {
  const { id } = await params;
  const friend = friends.find((item) => item.id === Number(id));
  if (!friend) notFound();
  return <FriendDetail friend={friend} />;
}
