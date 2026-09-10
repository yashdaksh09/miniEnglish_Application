const pool= require("../config/db.js");

async function getSituations(req, res) {
    try{
        const [rows]= await pool.query(
            'SELECT id, name, slug, icon, background, is_popular FROM situations WHERE is_active= TRUE ORDER BY id ASC'
        )// ASC- Ascending Order

        res.json(rows);
    }catch(error){
        console.error("Error fetching situations:", error);

        res.status(500).json({
            message: "Failed to fetch situations"
        })
    }
}

module.exports= {
    getSituations,
};