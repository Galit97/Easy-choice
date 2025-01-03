var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _this = this;
document.addEventListener("DOMContentLoaded", function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchAllProducts()];
            case 1:
                _a.sent();
                setupEventListeners();
                return [4 /*yield*/, fetchCategories()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var allProducts = [];
function fetchAllProducts(clientId) {
    return __awaiter(this, void 0, Promise, function () {
        var response, products, recommendedProducts, recommendedProductsResponse, combinedProducts, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, fetch("/api/products/get-products")];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Failed to fetch products");
                    return [4 /*yield*/, response.json()];
                case 2:
                    products = _a.sent();
                    recommendedProducts = [];
                    if (!clientId) return [3 /*break*/, 5];
                    return [4 /*yield*/, fetch("/api/products/get-recommended-products")];
                case 3:
                    recommendedProductsResponse = _a.sent();
                    if (!recommendedProductsResponse.ok)
                        throw new Error("Failed to fetch recommended products");
                    return [4 /*yield*/, recommendedProductsResponse.json()];
                case 4:
                    recommendedProducts = _a.sent();
                    _a.label = 5;
                case 5:
                    combinedProducts = __spreadArrays(recommendedProducts.map(function (product) { return (__assign(__assign({}, product), { isRecommended: true })); }), products.map(function (product) { return (__assign(__assign({}, product), { isRecommended: false })); }));
                    allProducts = combinedProducts.filter(function (product, index, self) { return index === self.findIndex(function (p) { return p._id === product._id; }); });
                    renderPage();
                    renderProducts(allProducts);
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error("Error fetching products:", error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function renderPage() {
    var appContainer = document.getElementById("main");
    if (!appContainer)
        return;
    appContainer.innerHTML = "\n    <div id=\"filter-sort-controls\">\n        <select id=\"categorySection\" name=\"category\">\n          <option value=\"\">Select category</option>\n        </select>\n        <select id=\"sort-filter\">\n            <option value=\"default\">Sort By</option>\n            <option value=\"price-asc\">Price: Low to High</option>\n            <option value=\"price-desc\">Price: High to Low</option>\n            <option value=\"name-asc\">Name: A to Z</option>\n            <option value=\"name-desc\">Name: Z to A</option>\n        </select>\n    </div>\n\n    <div id=\"product-list\"></div>\n  ";
}
function renderProducts(products) {
    var _this = this;
    var container = document.getElementById("product-list");
    if (!container)
        return;
    container.innerHTML = "\n    <div class=\"product-grid\">\n        " + products
        .map(function (product) { return "\n            <div class=\"product-card\">\n                <div  id=\"product-" + product._id + "\">\n                    <img src=\"" + product.image + "\" alt=\"" + product.name + "\" class=\"product-image\" />\n                    <h3 class=\"product-name\">" + product.name + "</h3>\n                    <div class=\"description-container\"><p class=\"product-description\">" + product.description + "</p></div>\n                    <div class=\"bottom-section\">  \n                       <i class=\"icon fa-solid fa-circle-chevron-down\"></i>\n                       <p class=\"product-price\">$" + product.price + "</p>\n                    </div>\n                </div>\n                <button class=\"button-more\" id=\"addToCart-" + product._id + "\">\n                  <i class=\"icon fa-solid fa-cart-shopping\"></i> Add to cart\n                </button>\n            </div>\n          "; })
        .join("") + "\n    </div>\n  ";
    products.forEach(function (product) {
        try {
            var productElement = document.getElementById("product-" + product._id);
            if (!productElement)
                throw new Error("Product " + product._id + " not found");
            productElement === null || productElement === void 0 ? void 0 : productElement.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
                var clientId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            renderProductView(product);
                            return [4 /*yield*/, getClientId()];
                        case 1:
                            clientId = _a.sent();
                            if (clientId) {
                                setInteraction(clientId, product._id, "view", 1);
                            }
                            ratingStars();
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        catch (error) {
            console.error(error);
        }
        try {
            var addToCartButton = document.getElementById("addToCart-" + product._id);
            if (!addToCartButton)
                throw new Error("Product " + product._id + " not found");
            addToCartButton === null || addToCartButton === void 0 ? void 0 : addToCartButton.addEventListener("click", function () {
                addToCart(product._id, 1);
            });
        }
        catch (error) {
            console.error(error);
        }
    });
}
function getClientId() {
    return __awaiter(this, void 0, Promise, function () {
        var response, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:3000/api/clients/get-client")];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data.clientId ? data.clientId : null];
                case 3:
                    error_2 = _a.sent();
                    console.error("Error getting client ID:", error_2);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function fetchCategories() {
    return __awaiter(this, void 0, Promise, function () {
        var response, categories, categorySelect_1, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/categories/get-all-categories")];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Failed to fetch categories");
                    return [4 /*yield*/, response.json()];
                case 2:
                    categories = _a.sent();
                    categorySelect_1 = document.getElementById("categorySection");
                    if (!categorySelect_1)
                        throw new Error("No category select element");
                    categorySelect_1.innerHTML = '<option value="">Select category</option>';
                    categories.forEach(function (category) {
                        var option = document.createElement("option");
                        option.value = category._id;
                        option.textContent = category.name;
                        categorySelect_1.appendChild(option);
                    });
                    categorySelect_1.addEventListener("change", function (event) {
                        var selectedCategory = event.target.value;
                        filterByCategory(selectedCategory);
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error("Error fetching categories:", error_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function filterByCategory(categoryId) {
    var filteredProducts = categoryId === "" || categoryId === "all"
        ? allProducts
        : allProducts.filter(function (product) { var _a; return ((_a = product.category) === null || _a === void 0 ? void 0 : _a._id) === categoryId; });
    renderProducts(filteredProducts);
}
function filterBySearch(productName) {
    var filteredProducts = allProducts.filter(function (product) {
        return product.name.toLowerCase().includes(productName.toLowerCase());
    });
    renderProducts(filteredProducts);
}
function sortProducts(criteria) {
    var sortedProducts = __spreadArrays(allProducts);
    switch (criteria) {
        case "price-asc":
            sortedProducts.sort(function (a, b) { return a.price - b.price; });
            break;
        case "price-desc":
            sortedProducts.sort(function (a, b) { return b.price - a.price; });
            break;
        case "name-asc":
            sortedProducts.sort(function (a, b) { return a.name.localeCompare(b.name); });
            break;
        case "name-desc":
            sortedProducts.sort(function (a, b) { return b.name.localeCompare(a.name); });
            break;
        default:
            return;
    }
    renderProducts(sortedProducts);
}
function setupEventListeners() {
    var categoryFilter = document.getElementById("categorySection");
    var sortFilter = document.getElementById("sort-filter");
    if (categoryFilter) {
        categoryFilter.addEventListener("change", function (event) {
            var category = event.target.value;
            filterByCategory(category);
        });
    }
    if (sortFilter) {
        sortFilter.addEventListener("change", function (event) {
            var criteria = event.target.value;
            sortProducts(criteria);
        });
    }
    var searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", function (event) {
            var searchQuery = event.target.value;
            filterBySearch(searchQuery);
        });
    }
}
