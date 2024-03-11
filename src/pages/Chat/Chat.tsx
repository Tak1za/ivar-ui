import { useParams } from 'react-router-dom';

export default function Chat() {
  const params = useParams();
  console.log('params: ', params);
  return <div>testing</div>;
}
