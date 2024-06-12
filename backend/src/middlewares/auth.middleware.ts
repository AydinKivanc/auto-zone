import { Request, Response, NextFunction } from "express"

// Middleware for authentication
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  const token = authHeader.split(" ")[1]

  // Basit bir token kontrolü (bu örnekte "mysecrettoken" olarak kabul edilir)
  if (token !== "mysecrettoken") {
    return res.status(401).json({ error: "Unauthorized" })
  }

  // Token geçerli ise sonraki middleware veya route handler'a geç
  next()
}

/*
Postman'i açın ve bir GET isteği oluşturun.
İstek URL'sine doğru endpoint'i girin. Örneğin, http://localhost:3000/api/v1/cars.
Authorization sekmesine gidin.
Type olarak Bearer Token'ı seçin.
Token alanına, middleware'inizin kabul ettiği token'ı girin. Bu örnekte "mysecrettoken" kullanıyoruz, dolayısıyla bu alan mysecrettoken olmalıdır.
İsteği gönderin.
İşte adım adım görsel kılavuz:

Postman'de GET isteğini oluşturun:

Authorization sekmesine gidin:

Type olarak Bearer Token'ı seçin:

Token alanına "mysecrettoken" yazın:

İsteği gönderin ve yanıtı alın.
*/
