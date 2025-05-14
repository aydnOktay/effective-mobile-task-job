const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-should-be-in-env';


const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Erişim yetkiniz yok. Giriş yapmalısınız.",
            });
        }

        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({
                success: false,
                message: "Geçersiz token formatı",
            });
        }

        const token = parts[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
        
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: "Geçersiz token",
            });
        } else if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message: "Token süresi dolmuş, yeniden giriş yapın",
            });
        } else {
            console.error("Token doğrulama hatası:", error);
            return res.status(500).json({
                success: false,
                message: "Sunucu hatası. Yetkilendirme yapılamadı.",
            });
        }
    }
};

module.exports = authMiddleware;