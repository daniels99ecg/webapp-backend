import { Request, RequestHandler, Response } from 'express';
import db from '../db/db';

export const createHomeOwner = async (req: Request, res: Response) => {
  const {
    firstname,
    lastname,
    phonenumber,
    email,
    password,
    countrycode,
    country,
    address,
    state,
    zcode,
    servicetype,
  } = req.body;

  try {
    // Verificar si el correo ya existe
    const existingUser = await db.query(
      `SELECT * FROM homeowner WHERE email = $1`,
      [email]
    );

    if (existingUser.rows.length > 0) {
       res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Insertar nuevo usuario si no existe
    const result = await db.query(
      `INSERT INTO homeowner (
        firstname, lastname, phonenumber, email, passwords, 
        countrycode, country, address, state, zcode, servicetype
      ) VALUES (
        $1, $2, $3, $4, $5, 
        $6, $7, $8, $9, $10, $11
      ) RETURNING *`,
      [
        firstname,
        lastname,
        phonenumber,
        email,
        password,
        countrycode,
        country,
        address,
        state,
        zcode,
        servicetype,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al crear usuario' });
  }
};


export const loginHomeOwner: RequestHandler = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  try {
    let result = await db.query(
      `SELECT * FROM homeowner WHERE email = $1`,
      [email]
    );
    let user = null;
    let userType = null;

     if (result.rows.length > 0) {
      user = result.rows[0];
      userType = 'homeowner';
    } else {
      // Buscar en serviceprovider si no está en homeowner
      result = await db.query(`SELECT * FROM serviceprovider WHERE email = $1`, [email]);
      if (result.rows.length > 0) {
        user = result.rows[0];
        userType = 'serviceprovider';
      }
    }

    if (result.rows.length === 0) {
      res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }


    if (user.passwords !== password) {
       res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }
    const userId = userType === "homeowner" ? user.user_id : user.serviceprovider_id;

    res.status(200).json({
      message: 'Login successful',
      
      user: {
        user_id: userId,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        userType
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};