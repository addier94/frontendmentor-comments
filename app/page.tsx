// get data.json from public folder 

import { Data } from "@/typescript/comment"
import { ListComments } from "./_components/list-comments"

// and render it to the page
const fetchData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data.json`)
  const data = await res.json()
  return data
}

export default async function Home() {
  const data:Data = await fetchData()
  return (
    <article className="bg-neutral-very-light-gray">
      <ListComments comments={data.comments} user={data.currentUser} />
    </article>
  )
}
