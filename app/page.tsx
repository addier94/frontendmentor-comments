import { Data } from "@/typescript/comment"
import { ListComments } from "./_components/list-comments"
import { rq } from '@/app/libs/axios';


const fetchData = async ():Promise<Data | undefined> => {
  try {
    const res = await rq.get('api/comments')
    return res.data
  } catch (error){
    console.log(error, 'Error trying to fetch comments')
    return undefined
  }
}

export default  async function Home() {
  const data =  await fetchData()

  if (!data) return <div>Something went wrong</div>

  return (
    <article className="bg-neutral-very-light-gray">
      <ListComments comments={data.comments} user={data.currentUser} />
    </article>
  )
}
