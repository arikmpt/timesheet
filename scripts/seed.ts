import { PrismaClient } from '../lib/generated/prisma';

import {
    assignAdminPermissionRole,
    assignEmployeePermissionRole,
    assignHrdPermissionRole,
    assignVendorPermissionRole,
    permissionSeeder,
    roleSeeder,
} from './role-seeder';
import userSeeder from './user-seeder';

const prisma = new PrismaClient();

async function main() {
    await roleSeeder(prisma);
    await permissionSeeder(prisma);
    await assignAdminPermissionRole(prisma);
    await assignHrdPermissionRole(prisma);
    await assignVendorPermissionRole(prisma);
    await assignEmployeePermissionRole(prisma);
    await userSeeder(prisma);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
