const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");


// Middleware to check if a user is authenticated
exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
        return next(new ErrorHandler("User not found", 404));
    }

    next();
});

// Middleware to check if a user is a seller
exports.isSeller = catchAsyncErrors(async (req, res, next) => {
    const { seller_token } = req.cookies;

    if (!seller_token) {
        return next(new ErrorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);
    req.seller = await Shop.findById(decoded.id);

    if (!req.seller) {
        return next(new ErrorHandler("Seller not found", 404));
    }

    next();
});

// Middleware to verify reset token
exports.verifyResetToken = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.params; // Assuming the token is provided in the URL parameters

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findOne({
            _id: decodedToken.userId,
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }, // Check if the expiry time is in the future
        });

        if (!user) {
            throw new Error("Invalid or expired token");
        }

        req.user = user;
        next();
    } catch (error) {
        return next(new ErrorHandler("Invalid or expired token", 401));
    }
});

// Middleware to check if a user has a specific role
exports.isAdmin = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`${req.user.role} cannot access this resource!`, 403));
        }
        next();
    };
};
