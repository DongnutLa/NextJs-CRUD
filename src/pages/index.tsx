import { Task } from 'src/interfaces/Task';
import { Grid, Button, GridRow, GridColumn } from 'semantic-ui-react';
import {useRouter} from 'next/router'
import TaskList from 'src/components/tasks/TaskList';
import Layout from 'src/components/Layout';

interface Props {
  tasks: Task[],
}

export default function index({ tasks }: Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
    return <Layout>{
      tasks.length === 0 ? 
      <Grid columns={3} centered verticalAlign='middle' style={{height: '70%'}}>
        <GridRow>
          <GridColumn>
            <h1>No hay tareas</h1>
            <Button onClick={() => router.push('/tasks/new')}>
              Create one
            </Button>
          </GridColumn>
        </GridRow>
      </Grid>
      : <TaskList tasks={tasks} />
    }</Layout>
}

export const getServerSideProps = async () => {

  const res = await fetch('http://localhost:3000/api/tasks/');
  const tasks = await res.json();

  return {
    props: {
      tasks: tasks,
    },
  };

};