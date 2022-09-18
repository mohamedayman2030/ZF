import client from '../database';

export class helper {
    async index(lisence:string){
        try {
const conn = await client.connect();
const sql = 'select vehicles.id,damage_name,damage_cost,healthy from vehicledamages join damagesinfo on vehicledamages.damage_id=damagesinfo.id and vehicles.license_number = vehicledamages.vehicle_id where vehicles.id = ($1)';
const result = await conn.query(sql)
conn.release()
return result.rows

        }
        catch(err){
            throw new Error(`couldn't get damages, Error:${err}`);
        }
    }
}