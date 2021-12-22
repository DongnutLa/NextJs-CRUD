import { Card, Form, Button, Icon, Grid, GridColumn, Confirm } from "semantic-ui-react";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Task } from "src/interfaces/Task";
import { useRouter } from 'next/router';
import Layout from "src/components/Layout";

export default function newPage() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    const [task, setTask] = useState({
        title: '',
        description: '',
    });

    const [openConfirm, setOpenConfirm] = useState(false)

    const handleChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => setTask({...task, [name]: value})

    const createTask = async (task: Task) => {
        await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
    }

    const loadTask = async (id: string) => {
        const res = await fetch(`http://localhost:3000/api/tasks/${id}`);
        const task = await res.json()
        setTask({title: task.title, description: task.description});
    }

    const updateTask = async (id: string, task: Task) => {
        await fetch(`http://localhost:3000/api/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        })
    }
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (typeof router.query.id === 'string') {
                updateTask(router.query.id, task)
            } else {
                await createTask(task);
            }
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: "DELETE",
            });
            router.push('/');
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (typeof router.query.id === 'string') loadTask(router.query.id)
    }, [])

    return (
        <Layout>
            
            <Grid centered columns={3} verticalAlign="middle" style={{height: '70%'}}>
                <GridColumn>
                    <Card>
                        <Card.Content>
                            <Form onSubmit={handleSubmit}>
                                <Form.Field>
                                    <label htmlFor="title">Title:</label>
                                    <input type="text" placeholder="Write your title"
                                    name="title" onChange={handleChange} value={task.title}/>
                                </Form.Field>
                                <Form.Field>
                                    <label htmlFor="description">Description:</label>
                                    <textarea placeholder="Write your description" name="description"
                                    rows={2} onChange={handleChange} value={task.description}></textarea>
                                </Form.Field>
                                {
                                    router.query.id ? (
                                        <Button color="teal">
                                            <Icon name="save"></Icon>
                                            Update
                                        </Button>
                                    ) : (
                                        <Button primary>
                                            <Icon name="save"></Icon>
                                            Save
                                        </Button>
                                    )
                                }
                            </Form>
                        </Card.Content>
                    </Card>

                        {
                            router.query.id && (
                                <Button color='red' onClick={() => setOpenConfirm(true)}>
                                    Delete
                                </Button>
                            )
                        }

                </GridColumn>
            </Grid>

            <Confirm
                header='Delete a task'
                content={`Are you sure you want to delete this task ${router.query.id}?`}
                open={openConfirm}
                onCancel={() => setOpenConfirm(false)}
                onConfirm={() => typeof router.query.id === 'string' && handleDelete(router.query.id)}
            />

        </Layout>
    )
}