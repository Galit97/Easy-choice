import { ClientModel } from "../../models/clientModel";
import bcrypt from 'bcrypt';
import 'dotenv/config';

export const secret="shsxxsloswk520"; //temporary secret
const saltRounds = parseInt("12", 10); //temporary rounds
// const saltRounds = parseInt(process.env.SALTROUNDS||"", 10);


export async function register(req: any, res: any) {
    try {
        if(!saltRounds) throw new Error("no Salt!");

        const { firstName, 
                lastName, 
                email,
                phoneNumber,  
                password, 
            } = req.body;

        if(!firstName || !lastName || !email || !phoneNumber || !password ) {
            throw new Error('Please fill all fields');
        };

        //hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //send request to DB
        await ClientModel.create({
            firstName,
            lastName,
            email,
            phoneNumber,
            password: hashedPassword,
            address: "",
        });

        res.cookie('client', { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });

        return res.status(201).send({ message: "User registered successfully" });

    } catch (error: any) {
        console.error(error);
        return res.status(500).send({ error: error.message });
    }
};

export async function login(req: any, res: any) {
    try {
        const { email, password } = req.body;
        
        const client = await ClientModel.findOne({ email });
        if (!client) {
            return res.status(400).send({ message: "You are not registered!!!!" });
        };

        // Check if the password is correct
        const passwordValid = await bcrypt.compare(password, client.password);
        if(!passwordValid) {
            return res.status(400).send({ message: "The password you provided is incorrect" });
        };

        //send client's id to the cookie
        res.cookie('client', client._id, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });

        return res.status(200).send({ message: "Login successful" });

    } catch (error: any) {
        if (error.code = "11000") {
            res.status(400).send({ error: "You are not registered" })
        }
        console.error(error);
        return res.status(500).send({ error: error.message });
    };
};

export async function deleteClient(req: any, res: any) {
    try {
        const { id } = req.body;
        if (!id) throw new Error("Client ID is required");

        await ClientModel.findByIdAndDelete(id);
        return res.status(200).send({ message: "Client deleted successfully" });
    } catch (error: any) {
        console.error(error);
        return res.status(500).send({ error: error.message });
    }
};

export async function updateClient(req: any, res: any) {
    try {
        const { id, updates } = req.body;
        if (!id || !updates) {
            console.error("Missing data:", { id, updates });
            throw new Error("Client ID and updates are required");
        }
        console.log("Received updates:", updates);

        const updatedClient = await ClientModel.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedClient) {
            console.log("No client found with id:", id);
            return res.status(404).send({ error: "Client not found" });
        }
        console.log("Client updated successfully:", updatedClient);
        return res.status(200).send({ message: "Client updated successfully" });
    } catch (error: any) {
        console.error("Error updating client:", error);
        return res.status(500).send({ error: error.message });
    }
}