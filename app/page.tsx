import { Data } from "@/typescript/comment"
import { CommentsList } from "./_components/comments-list"
import { rq } from '@/app/libs/axios';
import ErrorComponent from "@/components/error-component";


const fetchData = async ():Promise<Data> => {
  try {
    const res = await rq.get('api/comments')
    return res.data
  } catch (error){
    console.log(error, 'Error trying to fetch comments', error)
    throw error
  }
}

export default  async function Home() {
  try {
    const data =  await fetchData()
    const filteredComments = data.comments.sort((a,b) => b.score - a.score)

    return (
      <article className="bg-neutral-very-light-gray">
        <CommentsList comments={filteredComments} user={data.currentUser} />
      </article>
    )
  } catch (error:any) {
    return <ErrorComponent message={error?.response?.data || 'Something went wrong'}></ErrorComponent>
  }
}
