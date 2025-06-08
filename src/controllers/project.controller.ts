import { Request, RequestHandler, Response } from 'express';
import db from '../db/db';
const { v4: uuidv4 } = require("uuid");

export const registerHomeOwner = async (req: Request, res: Response) => {
     const { id, name, addToBid, startDate, endDate, cost, user_id } = req.body;
    const projectId = id || uuidv4();


  try {
   
    const query = `
      INSERT INTO projects (id, names, add_to_bid, start_date, end_date, costs, user_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      projectId,
      name,
      addToBid,
      addToBid ? startDate : null,
      addToBid ? endDate : null,
      addToBid ? cost : null,
      user_id
    ];

     const result = await db.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear usuario' });
  }
};

export const listAllHomeOwner = async (req: Request, res: Response) => {
  const { user_id } = req.query;

  try {
    const result = await db.query(
      "SELECT * FROM projects WHERE user_id = $1 ORDER BY id",
      [user_id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener los proyectos' });
  }
};

export const listAlllHomeOwner = async (req: Request, res: Response) => {

  try {
    const result = await db.query(
      "SELECT * FROM projects where add_to_bid=true ORDER BY id"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener los proyectos' });
  }
}


export const updateProject= async (req: Request, res: Response) => {
const { user_id } = req.query;
  try {
    const result = await db.query(
      "update projects set update_data = true where id = $1",
      [user_id]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener los proyectos' });
  }
}


