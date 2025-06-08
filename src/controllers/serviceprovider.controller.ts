import { Request, Response } from 'express';
import db from '../db/db';

export const createServiceProvider = async (req: Request, res: Response) => {
  const {
    firstname,
    lastname,
    companyname,
    experience,
    phonenumber,
    countrycode,
    address,
    state,
    zcode,
    servicetype,
    licensed,
    insuranced,
    email,
    passwords,
    city
  } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO serviceprovider (
        firstname, lastname, companyname, experience,
        phonenumber, countrycode, address, state, zcode,
        servicetype, licensed, insuranced, email, passwords,city
      ) VALUES (
        $1, $2, $3, $4,
        $5, $6, $7, $8, $9,
        $10, $11, $12, $13, $14, $15
      ) RETURNING *`,
      [
        firstname,
        lastname,
        companyname,
        experience,
        phonenumber,
        countrycode,
        address,
        state,
        zcode,
        servicetype,
        licensed,
        insuranced,
        email,
        passwords,
        city
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al registrar proveedor de servicio:', err);
    res.status(500).json({ message: 'Error al crear proveedor de servicios' });
  }
};


export const updateProject= async (req: Request, res: Response) => {
const { user_id } = req.query;
console.log("user_id", user_id);
  try {
    const result = await db.query(
      "update projects set update_data = true where id = $1",
      [user_id]
    );
    res.status(200).json(result.rows);
    console.log(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener los proyectos' });
  }
}

export const updateAllProject = async (req: Request, res: Response) => {
  const {
    names,
    add_to_bid,
    start_date,
    end_date,
    costs,
    user_id,
    update_data,
    id, // identificador del proyecto específico a actualizar
  } = req.body;
  try {
    const result = await db.query(
      `UPDATE projects
       SET names = $1,
           add_to_bid = $2,
           start_date = $3,
           end_date = $4,
           costs = $5,
           user_id = $6,
           update_data = $7
       WHERE id = $8
       RETURNING *`,
      [names, add_to_bid, start_date, end_date, costs, user_id, update_data, id]
    );
    res.status(200).json({ message: "Project updated successfully", project: result.rows[0] });
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).json({ message: "Error updating project" });
  }
};
