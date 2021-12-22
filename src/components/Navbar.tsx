import { Button, Container, Menu, MenuItem, MenuMenu } from "semantic-ui-react";
import Image from 'next/image';
import { useRouter } from "next/router";

export default function Navbar() {
    const router = useRouter();
    return(
        <Menu inverted attached style={{padding: '1.5rem'}}>
            <Container>
                <MenuItem onClick={() => router.push('/')}>
                    <Image
                        src="https://react.semantic-ui.com/logo.png"
                        width={30}
                        height={30}
                        alt="Logo"
                    />
                </MenuItem>

                <MenuMenu position='right'>
                    <MenuItem>
                        <Button onClick={() => router.push('/tasks/new')}>
                            new Task
                        </Button>
                    </MenuItem>
                </MenuMenu>
            </Container>
        </Menu>
    )
}