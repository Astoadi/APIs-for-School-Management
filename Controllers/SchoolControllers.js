import pool from "../Utils/db.js";

export const addSchool=async(req,res)=>{
    const {name,address,latitude,longitude}=req.body;
    const query="INSERT INTO schools (name, address, latitude, longitude) VALUES(?,?,?,?)";
    const query_values=[name,address,latitude,longitude];
    const [results,fields]=await pool.execute(query,query_values);
    if (results.affectedRows > 0){
        return res.json({
            message: "School created successfully",
            schoolId: results.insertId,
        });
    }else{
        return res.status(500).json({ message: "Failed to create school" });
    }
}

export const listSchool=async (req,res)=>{
    const {longitude,latitude}=req.query;
    if(!longitude || !latitude){
        return res.status(400).json({message:"Provide both lat and long"});
    }
    const query="SELECT name,address,longitude,latitude,(6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance_km FROM schools ORDER BY distance_km ASC";
    const query_values=[latitude,longitude,latitude]
    const [results,fields]=await pool.execute(query,query_values);
    if (results){
        return res.json({School_List:results});
    }
    return res.json({message:"No nearby school found"});
}
