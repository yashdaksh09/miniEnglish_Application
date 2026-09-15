const pool = require("../config/db.js");

async function getPhrasesBySection(req, res) {
  try {
    const { sectionId } = req.params;

    const [rows] = await pool.query(
      `SELECT
        id,
        section_id,
        hindi_text,
        english_text,
        better_english,
        audio_url,
        sort_order
       FROM phrases
       WHERE section_id = ? AND is_active = TRUE
       ORDER BY sort_order ASC`,
      [sectionId]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error fetching phrases:", error);
    res.status(500).json({
      message: "Failed to fetch phrases",
    });
  }
}

async function  getPhraseById(req, res){
  try{
    const {id}= req.params;

    const [phraseRows]= await pool.query(`SELECT 
      id, 
      section_id, 
      hindi_text, 
      english_text, 
      better_english, 
      audio_url,
      mindset_tip,
      mindset_image_url,
      example_english,
      example_hindi, 
      sort_order 
      FROM phrases WHERE id= ? AND is_active =TRUE `,[id]);

    if(phraseRows.length===0){
        return res.status(404).json({
          message: "Phrase not found"
        });
    }

      const [alternativeRows] = await pool.query(
      `SELECT
        id,
        phrase_id,
        english_text,
        description,
        audio_url,
        sort_order
       FROM phrase_alternatives
       WHERE phrase_id = ? AND is_active = TRUE
       ORDER BY sort_order ASC`,
      [id]
    );

    res.json({
      ...phraseRows[0], // add alternative rows in pahrase rows using spread operator
      alternativeRows: alternativeRows
    })

  }catch(error){
    console.error("Error fetching phrase:", error);
    res.status(500).json({
      message: "Failed to fetch phrase"
    });
  }
}

module.exports = {
  getPhrasesBySection,
  getPhraseById
};