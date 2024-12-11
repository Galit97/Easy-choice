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
function handleAddProduct(ev) {
    return __awaiter(this, void 0, Promise, function () {
        var formData, productData, response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ev.preventDefault();
                    formData = new FormData(ev.target);
                    productData = {
                        name: formData.get("name"),
                        description: formData.get("description"),
                        category: formData.get("category"),
                        price: parseFloat(formData.get("price")),
                        quantity: parseInt(formData.get("quantity"), 10),
                        inSale: formData.get("inSale") === "no",
                        image: formData.get("image")
                    };
                    console.log("djjd", formData);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("http://localhost:3000/api/products/add-product", {
                            method: "POST",
                            //   headers: { "Content-Type": "application/json" },
                            body: formData
                        })];
                case 2:
                    response = _a.sent();
                    console.log(response);
                    if (response.ok) {
                        console.log("Product added successfully");
                        ev.target.reset();
                    }
                    else {
                        throw new Error("Failed to add product");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error("Error adding product:", err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
;
// function renderProducts(products: any[]): void {
//   const container = document.getElementById("product-list");
//   if (!container) return;
//   container.innerHTML = `
//       <table>
//           <thead>
//               <tr>
//                   <th>Product Name</th>
//                   <th>Description</th>
//                   <th>Category</th>
//                   <th>Price</th>
//                   <th>Quantity</th>
//                   <th>In Stock</th>
//                   <th>Actions</th>
//               </tr>
//           </thead>
//           <tbody>
//               ${products
//                   .map(
//                       (product) => `
//                       <tr id="product-${product._id}">
//                           <td>${product.name}</td>
//                           <td>${product.description}</td>
//                           <td>${product.category?.name || "Uncategorized"}</td>
//                           <td>${product.price}</td>
//                           <td>${product.quantity}</td>
//                           <td>${product.inStock ? "Yes" : "No"}</td>
//                           <td>
//                               <button onclick="handleEditProduct('${product._id}')">Edit</button>
//                               <button onclick="handleDeleteProduct('${product._id}')">Delete</button>
//                           </td>
//                       </tr>
//                   `
//                   )
//                   .join("")}
//           </tbody>
//       </table>
//   `;
// }
function handleDeleteProduct(id) {
    var _a;
    return __awaiter(this, void 0, Promise, function () {
        var response, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch("/api/products/delete-product", {
                            method: "DELETE",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ id: id })
                        })];
                case 1:
                    response = _b.sent();
                    if (response.ok) {
                        (_a = document.getElementById("product-" + id)) === null || _a === void 0 ? void 0 : _a.remove();
                        console.log("Product deleted successfully");
                    }
                    else {
                        throw new Error("Failed to delete product");
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.error("Error deleting product:", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handleEditProduct(id) {
    return __awaiter(this, void 0, Promise, function () {
        var name, description, price, quantity, inStock, response, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = prompt("Enter new product name:");
                    if (!name)
                        return [2 /*return*/];
                    description = prompt("Enter new product description:");
                    if (!description)
                        return [2 /*return*/];
                    price = parseFloat(prompt("Enter new product price:") || "0");
                    quantity = parseInt(prompt("Enter new product quantity:") || "0", 10);
                    inStock = confirm("Is the product in stock?");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, fetch("/api/products/edit-product", {
                            method: "PATCH",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ id: id, name: name, category: category, Image: Image, description: description, price: price, quantity: quantity, inStock: inStock })
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 4];
                    console.log("Product edited successfully");
                    return [4 /*yield*/, fetchAllProducts()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4: throw new Error("Failed to edit product");
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_2 = _a.sent();
                    console.error("Error editing product:", error_2);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function renderProductForm() {
    var container = document.getElementById("product-form-container");
    if (!container)
        return;
    container.innerHTML = "\n      <form id=\"product-form\">\n          <label for=\"name\">Product Name:</label>\n          <input type=\"text\" id=\"name\" name=\"name\" placeholder=\"Enter product name\" required />\n\n          <label for=\"description\">Description:</label>\n          <textarea id=\"description\" name=\"description\" placeholder=\"Enter description\" required></textarea>\n\n          <label for=\"category\">Category:</label>\n          <select id=\"category\" name=\"category\" required>\n              <option value=\"\">-Select category-</option>\n          </select>\n\n          <label for=\"price\">Price:</label>\n          <input type=\"number\" id=\"price\" name=\"price\" placeholder=\"Enter price\" required />\n\n          <label for=\"quantity\">Quantity:</label>\n          <input type=\"number\" id=\"quantity\" name=\"quantity\" placeholder=\"Enter quantity\" required />\n\n          <label for=\"inSale\">In Sale:</label>\n          <select id=\"inSale\" name=\"inSale\">\n              <option value=\"yes\">Yes</option>\n              <option value=\"no\">No</option>\n          </select>\n\n          <label for=\"image\">Product Image:</label>\n          <input type=\"file\" id=\"image\" name=\"image\" accept=\"image/*\" />\n\n          <button type=\"submit\">Add Product</button>\n      </form>\n  ";
    var form = document.getElementById("product-form");
    if (form)
        form.addEventListener("submit", handleAddProduct);
}
;
;
function fetchCategories() {
    return __awaiter(this, void 0, Promise, function () {
        var response, categories, categorySelect_1, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log("Fetching categories");
                    return [4 /*yield*/, fetch("/api/categories/get-all-categories")];
                case 1:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Failed to fetch categories");
                    return [4 /*yield*/, response.json()];
                case 2:
                    categories = _a.sent();
                    categorySelect_1 = document.getElementById('category');
                    categorySelect_1.innerHTML = '<option value="">--Select category--</option>';
                    categories.forEach(function (category) {
                        var option = document.createElement('option');
                        option.value = category._id;
                        option.textContent = category.name;
                        categorySelect_1.appendChild(option);
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
