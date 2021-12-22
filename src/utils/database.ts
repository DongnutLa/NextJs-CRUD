import { Pool } from 'pg';

let conn: any;
if (!conn) {
    conn = new Pool({
        user: 'dongnutla',
        password: '1608',
        host: 'localhost',
        port: 5432,
        database: 'tasksdb'
    });
}

export { conn };