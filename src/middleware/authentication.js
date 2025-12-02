import jwt from 'jsonwebtoken';
  import 'dotenv/config';
  const secret_key = "sekretkey0108108"//process.env.JWT_SECRET_KEY;
  // Middleware para verificar el token JWT
  export const authentication = (req, res, next) => {

    // LÍNEA NUEVA
    //if (!req.headers['authorization']) return res.sendStatus(401);

    //const token = req.headers['authorization'].split(" ")[1];

    //if (!token) return res.sendStatus(401);


    //jwt.verify(token, secret_key, (err) => {
        //if (err) return res.sendStatus(403);
        //next();
    //});
    const header = req.headers["authorization"];
    if (!header) return res.status(401).json({ error: "Unauthorized" });

    const token = header.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, secret_key, (err) => {
      if (err) return res.status(403).json({ error: "Forbidden" });
      next();
    });
  }