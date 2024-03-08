import express, {Request, Response, NextFunction} from 'express'
import mongoose, {Document, Model} from 'mongoose'
import bcrypt from 'bcrypt'


//Set up Express app
const app = express();
app.use(express.json());

//Define user interface 
interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
}

//Define user schema
const userSchema = new mongoose.Schema<UserDocument>({
    username: String,
    email: String,
    password: String
})

//Create User model
const User: Model<UserDocument> = mongoose.model('User', userSchema);

//Register a new user
app.post('/register', async (req: Request, res: Response) => {
    try {
        const {username, email,password} = req.body;
        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //Create a new user
        const user = new User({ username,email, password: hashedPassword});
        await user.save()

        res.status(201).json({ message: 'User registered successfully'})
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Inernal server error'})
    }
});
