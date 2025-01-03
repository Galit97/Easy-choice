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
exports.updateCart = exports.addToCart = void 0;
var cartModel_1 = require("../../models/cartModel");
var productModel_1 = require("../../models/productModel");
function addToCart(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, productId_1, quantity, client, clientId, product, cart, productExists, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    _a = req.body, productId_1 = _a.productId, quantity = _a.quantity;
                    if (!productId_1 || !quantity) {
                        return [2 /*return*/, res
                                .status(400)
                                .json({ message: "Product ID and quantity are required" })];
                    }
                    client = req.client;
                    clientId = client === null || client === void 0 ? void 0 : client._id;
                    return [4 /*yield*/, productModel_1.ProductModel.findById(productId_1)];
                case 1:
                    product = _b.sent();
                    if (!product) {
                        return [2 /*return*/, res.status(404).json({ message: "Product not found" })];
                    }
                    return [4 /*yield*/, cartModel_1.CartModel.findOne({ clientId: clientId }).populate("products.product")];
                case 2:
                    cart = _b.sent();
                    if (cart) {
                        productExists = cart.products.find(function (p) { return p.product.toString() === productId_1; });
                        if (productExists) {
                            productExists.quantity += quantity;
                        }
                        else {
                            cart.products.push({ product: productId_1, quantity: quantity });
                            cart.total += product.price;
                        }
                    }
                    else {
                        cart = new cartModel_1.CartModel({
                            products: [{ product: productId_1, quantity: quantity }],
                            clientId: clientId,
                            total: quantity * product.price
                        });
                    }
                    return [4 /*yield*/, cart.save()];
                case 3:
                    _b.sent();
                    res.status(200).json({ message: "Cart updated successfully", cart: cart, clientId: clientId });
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    console.error("Error in addToCart:", error_1);
                    return [2 /*return*/, res.status(500).send({ error: "Internal Server Error" })];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.addToCart = addToCart;
function updateCart(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, productId_2, action, client, clientId, cart, productIndex, product, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, productId_2 = _a.productId, action = _a.action;
                    if (!productId_2) {
                        return [2 /*return*/, res.status(400).json({ message: "Product ID is required" })];
                    }
                    client = req.client;
                    clientId = client === null || client === void 0 ? void 0 : client._id;
                    return [4 /*yield*/, cartModel_1.CartModel.findOne({ clientId: clientId }).populate("products.product")];
                case 1:
                    cart = _b.sent();
                    if (!cart) {
                        return [2 /*return*/, res.status(404).json({ message: "Cart not found" })];
                    }
                    productIndex = cart.products.findIndex(function (p) { return JSON.stringify(p.product._id) === JSON.stringify(productId_2); });
                    if (productIndex === -1) {
                        return [2 /*return*/, res.status(404).json({ message: "Product not found in cart" })];
                    }
                    product = cart.products[productIndex];
                    if (action === "increase") {
                        product.quantity += 1;
                        cart.total += product.product.price;
                    }
                    else if (action === "decrease") {
                        if (product.quantity > 1) {
                            product.quantity -= 1;
                            cart.total -= product.product.price;
                        }
                        else {
                            cart.total -= product.product.price;
                            cart.products.splice(productIndex, 1);
                        }
                    }
                    else if (action === "remove") {
                        cart.total -= product.product.price * product.quantity;
                        cart.products.splice(productIndex, 1);
                    }
                    else {
                        return [2 /*return*/, res.status(400).json({ message: "Invalid action" })];
                    }
                    return [4 /*yield*/, cart.save()];
                case 2:
                    _b.sent();
                    return [2 /*return*/, res.status(200).send({ message: "Cart updated successfully" })];
                case 3:
                    error_2 = _b.sent();
                    console.error("Error in update cart:", error_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateCart = updateCart;
;
