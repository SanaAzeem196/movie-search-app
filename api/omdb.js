export default async function handler(req, res) {
  const { s, i } = req.query;
  
  const apiKey = process.env.OMDB_KEY;

  
  try {
    let omdbUrl;
    
    if (i) {
      omdbUrl = `https://www.omdbapi.com/?i=${encodeURIComponent(i)}&apikey=${apiKey}`;
    } else if (s) {
      omdbUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(s)}&apikey=${apiKey}`;
    } else {
      
      return res.status(400).json({ Response: "False", Error: "Parameter 's' or 'i' is required." });
    }

    const response = await fetch(omdbUrl);
    const data = await response.json();
    
    
    return res.status(200).json(data);

  } catch (error) {
    
    return res.status(500).json({ Response: "False", Error: "Server failed to fetch movie data." });
  }
}
