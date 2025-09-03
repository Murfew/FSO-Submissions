import { useParams } from 'react-router-dom'
import User from '../components/User'

export default function UserPage({ users }) {
  const { id } = useParams()
  const user = users.find((u) => u.id === id)
  return <User user={user} />
}
