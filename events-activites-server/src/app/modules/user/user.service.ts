import { prisma } from "../../shared/prisma";
import bcrypt from "bcrypt";
import { IUserCreateInput } from "./user.interface";
// import { fileUploader } from "../../helper/fileUploader";

const createUser = async (data: IUserCreateInput) => {

    const { email, password, role = "USER" } = data;

    // check existing user
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) throw new Error("User already exists");

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashed,
            fullName: data.fullName,
            profileImage: data.profileImage,
            interests: data.interests ?? [],
            city: data.city,
            role,
        },
    });

    return user;
}

export const UserService = {
    createUser
}