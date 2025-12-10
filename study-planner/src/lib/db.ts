import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'users.json');

export interface User {
    id: string;
    email: string;
    name: string;
    mobile?: string;
    designation?: string;
    pincode?: string;
    officeName?: string;
    division?: string;
    circle?: string;
    passwordHash: string;
    role?: 'user' | 'admin';
    membershipLevel?: 'free' | 'silver' | 'gold';
    resetToken?: string;
    resetTokenExpiry?: number;
    createdAt: string;
}

// Ensure DB file exists
function ensureDb() {
    if (!fs.existsSync(DB_PATH)) {
        // directory might not exist if data folder was empty
        const dir = path.dirname(DB_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
    }
}

export function getAllUsers(): User[] {
    ensureDb();
    try {
        const data = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export function getUserByEmail(email: string): User | undefined {
    const users = getAllUsers();
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function getUserByResetToken(token: string): User | undefined {
    const users = getAllUsers();
    return users.find((u) => u.resetToken === token && u.resetTokenExpiry && u.resetTokenExpiry > Date.now());
}

export async function createUser(
    email: string,
    password: string,
    name: string,
    additionalData: Partial<User> = {},
    role: 'user' | 'admin' = 'user'
): Promise<User> {
    const users = getAllUsers();

    if (getUserByEmail(email)) {
        throw new Error('User already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser: User = {
        id: crypto.randomUUID(),
        email,
        name,
        role,
        passwordHash,
        createdAt: new Date().toISOString(),
        ...additionalData // Spread additional fields
    };

    users.push(newUser);
    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));

    return newUser;
}

export async function verifyUser(email: string, password: string): Promise<User | null> {
    const user = getUserByEmail(email);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return null;

    return user;
}

export function updateUser(currentEmail: string, updates: Partial<User>): User | null {
    const users = getAllUsers();
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === currentEmail.toLowerCase());

    if (userIndex === -1) return null;

    // If email is being changed, check if new email is taken
    if (updates.email && updates.email.toLowerCase() !== currentEmail.toLowerCase()) {
        const existing = getUserByEmail(updates.email);
        if (existing) {
            throw new Error("Email already in use");
        }
    }

    const updatedUser = { ...users[userIndex], ...updates };
    users[userIndex] = updatedUser;

    fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
    return updatedUser;
}
