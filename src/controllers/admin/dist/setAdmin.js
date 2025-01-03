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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.loginAdmin = exports.addAdmin = void 0;
var adminModel_1 = require("../../models/adminModel");
var bcrypt_1 = require("bcrypt");
require("dotenv/config");
var inspector_1 = require("inspector");
// export const secret="shsxxsloswk520"; //temporary secret
// const saltRounds = parseInt("12", 10); //temporary rounds
// const saltRounds = parseInt(process.env.SALTROUNDS||"", 10);
function addAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
exports.addAdmin = addAdmin;
function loginAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, admin, passwordValid, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    inspector_1.console.log('Request body:', req.body);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    _a = req.body, email = _a.email, password = _a.password;
                    if (!email) {
                        return [2 /*return*/, res.status(400).send({ message: "Email and password are required" })];
                    }
                    return [4 /*yield*/, adminModel_1.AdminModel.findOne({ email: email })];
                case 2:
                    admin = _b.sent();
                    if (!admin) {
                        return [2 /*return*/, res.status(400).send({ message: "You are not registered!!!!" })];
                    }
                    return [4 /*yield*/, bcrypt_1["default"].compare(password, admin.password)];
                case 3:
                    passwordValid = _b.sent();
                    if (!passwordValid) {
                        return [2 /*return*/, res.status(400).send({ message: "The password you provided is incorrect" })];
                    }
                    ;
                    //send client's id to the cookie
                    res.cookie('admin', admin._id, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
                    return [2 /*return*/, res.status(200).send({ message: "Login successful" })];
                case 4:
                    error_1 = _b.sent();
                    if (error_1.code = "11000") {
                        res.status(400).send({ error: "You are not registered" });
                    }
                    inspector_1.console.error(error_1);
                    return [2 /*return*/, res.status(500).send({ error: error_1.message })];
                case 5:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
exports.loginAdmin = loginAdmin;
;
