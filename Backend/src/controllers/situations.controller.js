const pool= require("../config/db.js");


//show all situations
async function getSituations(req, res) {
  try {
    const [rows] = await pool.query(
      `SELECT
        s.id,
        s.name,
        s.slug,
        s.icon,
        s.image_url,
        s.description,
        s.search_keywords,
        s.background,
        s.is_popular,
        COUNT(p.id) AS phrase_count
       FROM situations s
       LEFT JOIN situation_sections ss
         ON ss.situation_id = s.id
         AND ss.is_active = TRUE
       LEFT JOIN phrases p
         ON p.section_id = ss.id
         AND p.is_active = TRUE
       WHERE s.is_active = TRUE
       GROUP BY
        s.id,
        s.name,
        s.slug,
        s.icon,
        s.image_url,
        s.description,
        s.search_keywords,
        s.background,
        s.is_popular
       ORDER BY s.id ASC`
    );

    res.json(rows);
  } catch (error) {
    console.error("Error fetching situations:", error);

    res.status(500).json({
      message: "Failed to fetch situations"
    });
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

        const [rows]= await pool.query(`SELECT id, situation_id, name, description, tip_description, sort_order FROM situation_sections WHERE situation_id=? AND is_active= TRUE ORDER BY sort_order ASC`, [id])

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

async function getSectionById(req, res) {
    try{

        const {id}= req.params;

        const [rows]= await pool.query(`
            
            SELECT id,
            situation_id,
            name,
            description,
            tip_description,
            sort_order
            FROM situation_sections
            WHERE id=? AND is_active=TRUE
            `, [id]);

            if(rows.length===0){
                return res.status(404).json({
                    message: "Section not found"
                });
            }

            res.json(rows[0]);
    }catch(error){
        console.error("Error fetching section:", error);

        res.status(500).json({
            message: "Failed to fetch section",
            error: error.message
        })
    }
}

module.exports= {
    getSituations,
    getSituationById,
    getSituationSections,
    getSectionById
};