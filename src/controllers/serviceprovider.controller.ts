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
    userid,
  } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO serviceprovider (
        firstname, lastname, companyname, experience,
        phonenumber, countrycode, address, state, zcode,
        servicetype, licensed, insuranced, userid
      ) VALUES (
        $1, $2, $3, $4,
        $5, $6, $7, $8, $9,
        $10, $11, $12, $13
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
        userid
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al registrar proveedor de servicio:', err);
    res.status(500).json({ message: 'Error al crear proveedor de servicios' });
  }
};
