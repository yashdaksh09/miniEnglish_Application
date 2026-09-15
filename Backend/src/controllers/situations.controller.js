const pool= require("../config/db.js");


//show all situations
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


// get situation according to id 
async function getSituationById(req, res) {
    try{
        const {id}= req.params;

        const [rows]= await pool.query(`SELECT * FROM situations WHERE id= ? AND is_active= TRUE`, [id]);

        if(rows.length===0){
            return res.status(404).json({
                message: "Situation not found"
            });
        }
    
        res.json(rows[0]);
    }catch(error){
        console.error("Error fetching situation:", error);

        res.status(500).json({
            message: "Failed to fetch situation"
        });
    }
}


async function getSituationSections(req, res) {
    try{
        const {id}= req.params;

        const [rows]= await pool.query(`SELECT id, situation_id, name, description, sort_order FROM situation_sections WHERE situation_id=? AND is_active= TRUE ORDER BY sort_order ASC`, [id])

        if(rows.length=== 0){
              return res.status(404).json({
                message: "Situation Section not found"
            });
        }
        res.json(rows);
    }catch(error){
        console.error("Error fetching situation sections", error);

        res.status(500).json({
            message: "Failed to fetch situation sections"
        })
    }
}
module.exports= {
    getSituations,
    getSituationById,
    getSituationSections
};