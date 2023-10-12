import client from "../db/config.js";
import pool from '../db/config.js';


const get = async (req, res) => {
    const getLavash = await client.query("SELECT * from category");
    res.status(200).json(getLavash.rows);
};

// const create = async (req, res) => {
//     try {
//       const { 
//         title,
//         img,
//         status,
//         price
//        } = req.body
//        const product = await pool.query(`INSERT INTO lavashlar(title,img, status,price) VALUES($1, $2, $3,$4)`,
//       [title,img, status,price]);
//        console.log(product);
//         res.status(201).json({
//           data:{
//             msg:'Created!'
//           },
//         });
  
//       res.status(200).json("ok");
      
//     } catch (error) {
//       res.status(500).json({ error: error.detail });
//     }
//   };
// const deleteP = async(req,res) =>{
//     try {
//         const { id } = req.params;
//         console.log(id);
//         let foundedCompany = await pool.query(` DELETE FROM lavashlar WHERE id = $1`, [id]);
//         res.status(200).json({
//             msg: 'Maxsulot deleted!'
//         });
//     } catch (error) {
//       console.log(error);
//     }
// }
  

export {get} ;
