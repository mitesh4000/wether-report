"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // Import JWT library
const users_modal_1 = __importDefault(require("../models/users.modal"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_modal_1.default.find();
    res.json(users);
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield users_modal_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ err: "Invalid email or password" });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ err: "Invalid  email or password" });
        }
        const payload = { userId: user._id };
        const secret = process.env.JWT_SECRET;
        const expiry = process.env.JWT_EXPIRY;
        if (!secret || !expiry) {
            console.error("environment variable not provided");
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
        const token = jsonwebtoken_1.default.sign(payload, secret, {
            expiresIn: expiry,
        });
        return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({ data: token });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ err: "Internal server error" });
    }
}));
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const existingUser = yield users_modal_1.default.findOne({ email });
        if (existingUser) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: "Email already exists" });
        }
        const hashedPassword = yield (0, utils_1.hashPassword)(password);
        const newUser = new users_modal_1.default({ name, email, password: hashedPassword });
        yield newUser.save();
        res
            .status(http_status_codes_1.StatusCodes.CREATED)
            .json({ message: "Registration successful" });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ err: error });
    }
}));
exports.default = router;
