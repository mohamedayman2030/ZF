import client from '../database';

export type damage = {
    lisence_number:string;
    damage:boolean;
}

export class damages {

    async create(d:damage):Promise<damage> {
try {
    const conn = await client.connect();
    const sql = 'INSERT INTO damages (vehicle_id,damaged) VALUES ($1,$2) RETURNING *';
    const result = await conn.query(sql,[d.lisence_number,d.damage]);
     conn.release();
    return result.rows[0];
}
catch(err){
    throw new Error(`couldn't create damages, Error:${err}`);
}
    }

    async indexdamaged(lisence:string):Promise<damage[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM damages WHERE vehicle_id=($1) and damaged = true order by id desc';
            const result = await conn.query(sql,[lisence]);
             conn.release();
            return result.rows;
        }
        catch(err){
            throw new Error(`couldn't get damages, Error:${err}`);
        }
            }

            async indexgeneral(lisence:string):Promise<damage[]> {
                try {
                    const conn = await client.connect();
                    const sql = 'SELECT * FROM damages WHERE vehicle_id=($1) order by id desc';
                    const result = await conn.query(sql,[lisence]);
                     conn.release();
                    return result.rows;
                }
                catch(err){
                    throw new Error(`couldn't get damages, Error:${err}`);
                }
                    }

}